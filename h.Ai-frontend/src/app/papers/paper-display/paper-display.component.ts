import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ChatBoxComponent } from '../../chat-box/chat-box.component';

import { PaperService } from '../../services/paper/paper.service';
import { Paper } from '../../shared/models/paper.model';


@Component({
  selector: 'app-paper-display',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ChatBoxComponent
  ],
  templateUrl: './paper-display.component.html',
  styleUrls: ['./paper-display.component.less']   // Falls du hier "styleUrl" hattest, sollte es "styleUrls" heißen
})
export class PaperDisplayComponent implements OnInit {

  paper: Paper | null = null;

  // Hier speichern wir die „entschärfte“ URL fürs Iframe
  sanitizedPdfUrl: SafeResourceUrl | null = null;
  sanitizedImageUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private paperService: PaperService,
    private sanitizer: DomSanitizer,   // <-- Wichtig für das Umgehen von NG0904

  ) {}

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.paperService.getPapersViaTitle(title).subscribe(
        (response: { papers: Paper[]; totalPapers: number }) => {
          const data = response.papers[0] || null;
          if (data) {
            this.paper = data;

            if (data.pdfUrl) {
              this.sanitizedPdfUrl = this.sanitizer
                .bypassSecurityTrustResourceUrl(data.pdfUrl);
            }

            if (data.image) {
              this.sanitizedImageUrl = this.sanitizer
                .bypassSecurityTrustResourceUrl(data.image);
              console.log('Sanitized Image URL:', this.sanitizedImageUrl);
            }            

          } else {
            console.error('Cannot find paper with this title.');
          }
        },
        (error: any) => {
          console.error('Error fetching paper:', error);
        }
      );
    }
  }
}