import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../services/author/author.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-researchers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, FormsModule, CommonModule, NgFor, NgIf],
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

  constructor(private authorService: AuthorService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('queryParams:', this.route.snapshot.queryParams);
    const params: Params = this.route.snapshot.queryParams;

    
    this.searchQuery = params['authorName'] || '';
  
    if (this.searchQuery) {
      this.searchAuthorPapers(this.searchQuery);
    } else {
      this.fetchResearchers();
    }
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
    this.authorService.getAuthorByName(this.searchQuery).subscribe({
      next: (data) => {
        this.researchers = [data];
        this.totalPages = 1;
        this.currentPage = 1;
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

  searchAuthorPapers(authorName: string) {
    // Navigate to search page with author name as query parameter
   this.authorService.getAuthorByName(authorName).subscribe({
      next: (data) => {
        this.researchers = [data];
        this.totalPages = 1;
        this.currentPage = 1;
      }
    });
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
