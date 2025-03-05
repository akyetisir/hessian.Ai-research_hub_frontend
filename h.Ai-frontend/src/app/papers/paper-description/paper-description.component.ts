import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf  } from '@angular/common';
import { Paper } from '../../shared/models/paper.model'; 
import { Author } from '../../shared/models/author.model';
import { AuthorService } from '../../services/author/author.service';



@Component({
  selector: 'app-paper-description',
  standalone: true,
  imports: [ RouterLink, NgIf, CommonModule],
  templateUrl: './paper-description.component.html',
  styleUrl: './paper-description.component.less'
})


export class PaperDescriptionComponent{
  @Input() paper: Paper | null = null;
  teamMembers: Author[] = [];

 constructor(private authorService: AuthorService) {
    this.fetchTeamMembers();
 }
  
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
