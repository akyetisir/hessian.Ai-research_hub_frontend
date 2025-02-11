import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../services/author/author.service';

@Component({
  selector: 'app-researchers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './researchers.component.html',
  styleUrl: './researchers.component.less'
})
export class ResearchersComponent {
  researchers: Author[] = [];
  selectedResearcher: any = null;

  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 15;
  totalResearchers: number = 0;
  totalPages: number = 0;

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.fetchResearchers(); // Load all researchers
  }

  fetchResearchers() {
    this.authorService.getAllAuthors(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.researchers = response.authors;
        this.totalResearchers = response.total_count;
        this.totalPages = Math.ceil(this.totalResearchers / this.pageSize);
        this.sortResearchers();
      },
      error: (err) => console.error('Error fetching researchers:', err)
    });
  }

  sortResearchers() {
    this.researchers.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }

  showProfile(researcher: Author) {
    console.log('Selected Researcher:', researcher);
    this.selectedResearcher = researcher;
  }

  closeProfile() {
    this.selectedResearcher = null;
  }

    // Pagination controls
    nextPage() {
      if (this.currentPage * this.pageSize < this.totalResearchers) {
        this.currentPage++;
        this.fetchResearchers();
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchResearchers();
      }
    }

}
