import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../services/author/author.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-researchers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './researchers.component.html',
  styleUrl: './researchers.component.less'
})
export class ResearchersComponent {
  researchers: Author[] = [];
  selectedResearcher: any = null;

  // Search variables
  searchQuery: string = '';

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

  searchByName() {
    if (!this.searchQuery) {
      this.fetchResearchers();
      return;
    }
    this.currentPage = 1;
    this.authorService.getAuthorByName(this.searchQuery).subscribe({
      next: (data) => {
        this.researchers = [data];
        this.totalPages = 1;
      },
      error: (err) => {
        console.error('Error fetching researcher by name:', err);
        this.researchers = [];
      }
    });
  }

  perfomSearch(): void {
    if(this.searchQuery === '') {
      this.fetchResearchers();
      return;
    }
    this.currentPage = 1;
    this.searchByName();
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.perfomSearch();
    }
  }

  resetSearch() {
    this.searchQuery = '';
    this.currentPage = 1;
    this.fetchResearchers();
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
      this.scrollToTop();
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchResearchers();
      }
      this.scrollToTop();
    }

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll to top
      });
    }

}
