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

import { MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-paper-display',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ChatBoxComponent,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './paper-display.component.html',
  styleUrls: ['./paper-display.component.less']   // Falls du hier "styleUrl" hattest, sollte es "styleUrls" heißen
})
export class PaperDisplayComponent implements OnInit {

  paper: Paper | null = null;
  teamMembers: Author[] = [];

  flagData = {"tooltip": "", "icon":""}

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
            this.setFlagData(data.is_hess_paper)

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


  setFlagData(is_hess_paper: string): void{
    // should never be seen as these papers should not be shown 
    if (is_hess_paper === "no_verified") {
      this.flagData.tooltip = "This paper was marked not to be a hessian.ai paper"
      this.flagData.icon = 'fa-solid top fa-brain fa-fw'
    }
    else if (is_hess_paper === "yes_verified") {
      this.flagData.tooltip = "This paper is verified as a hessian.ai paper"
      this.flagData.icon = 'fa-solid top fa-brain fa-fw'
    }
    else if (is_hess_paper === "most_probably_a_hess_paper") {
      this.flagData.tooltip = "This paper is not verified and might not be a hessian.ai paper. Click here to verify or mark as a non hessian.ai paper"
      this.flagData.icon = 'fa-solid top fa-brain fa-fw'
    }
    else if (is_hess_paper === "maybe_not_a_hess_paper") {
      this.flagData.tooltip = "This paper is not verified and might not be a hessian.ai paper. Click here to verify or mark as a non hessian.ai paper"
      this.flagData.icon = 'fa-solid top fa-brain fa-fw'
    }
  }
}
