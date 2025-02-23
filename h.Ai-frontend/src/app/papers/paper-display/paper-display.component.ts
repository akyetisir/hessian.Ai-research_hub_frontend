import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ChatBoxComponent } from '../../chat-box/chat-box.component';

import { PaperService } from '../../services/paper/paper.service';
import { Paper } from '../../shared/models/paper.model';

import { Author } from '../../shared/models/author.model';
import { AuthorService } from '../../services/author/author.service';


@Component({
  selector: 'app-paper-display',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ChatBoxComponent,
  ],
  templateUrl: './paper-display.component.html',
  styleUrls: ['./paper-display.component.less']   // Falls du hier "styleUrl" hattest, sollte es "styleUrls" heißen
})
export class PaperDisplayComponent implements OnInit {

  paper: Paper | null = null;
  teamMembers: Author[] = [];

  // Hier speichern wir die „entschärfte“ URL fürs Iframe
  sanitizedPdfUrl: SafeResourceUrl | null = null;
  sanitizedImageUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private paperService: PaperService,
    private sanitizer: DomSanitizer,   // <-- Wichtig für das Umgehen von NG0904
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.fetchTeamMembers();
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

  // This function fetches all team members from the server
  fetchTeamMembers(): void {
    this.authorService.getAllAuthors().subscribe(
      (data: { authors: Author[] }) => {
        this.teamMembers = data.authors;
        console.log('Team members:', this.teamMembers);
      },
      (err) => {
        console.error('Error fetching team members:', err);
      }
    );
  }

  isTeamMember(author: string): boolean {
    for (const member of this.teamMembers) {
      if (member.name === author) {
        return true;
      }
    }
    return false;    
  }
}
