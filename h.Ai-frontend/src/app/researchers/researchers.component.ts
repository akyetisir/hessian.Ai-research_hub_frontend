import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../services/author/author.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-researchers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './researchers.component.html',
  styleUrl: './researchers.component.less'
})
export class ResearchersComponent {
  researchers: Author[] = [];
  selectedResearcher: any = null;

  // For search function
  searchQuery: string = '';
  filteredResearchers: Author[] = [];
  researchersToDisplay: Author[] = [];

  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 15;
  totalResearchers: number = 0;
  totalPages: number = 1;

  // Sort option
  sortOption: string = 'Name (A-Z)';

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.fetchResearchers(); // Load all researchers
    console.log('Researchers:', this.researchers);
  }

  fetchResearchers(): void {
    this.authorService.getAllAuthors(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        if(data.authors.length > 0) {
          this.researchers = data.authors;
          this.filteredResearchers = [...this.researchers];
          this.totalResearchers = data.total_count;
          this.totalResearchers = Math.ceil(this.totalResearchers / this.pageSize);
          this.sortResults();
          console.log('Researchers fetched successfully:', this.researchers);
        } else {
          console.error('No researchers found');
          this.filteredResearchers = [];
        }
     },
      error: (err) => console.error('Error fetching researchers:', err)
    });
  }

  sortResults() {
    this.researchers.sort((a, b) => {
      switch (this.sortOption) {
        case 'Name (A-Z)':
          return a.name.localeCompare(b.name);
        case 'Name (Z-A)':
          return b.name.localeCompare(a.name);
        case 'H-Index (High to Low)':
          return b.h_index - a.h_index;
        case 'H-Index (Low to High)':
          return a.h_index - b.h_index;
        case 'Citations (High to Low)':
          return b.citations - a.citations;
        case 'Citations (Low to High)':
          return a.citations - b.citations;
        default:
          return 0;
      }
    });
  }


  get displayResearchers(): Author[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    console.log('Displayed researchers:', this.researchersToDisplay);
    return this.researchers;
  }

  get searchedResearchers() {
    if (this.searchQuery === '') {
      this.filteredResearchers = [...this.researchers]; 
      this.totalPages = Math.ceil(this.totalResearchers / this.pageSize);
      return;
    } else {
      this.authorService.getAuthorByName(this.searchQuery).subscribe({
        next: (data) => {
          if (data) {
            this.filteredResearchers = [data];  
            this.totalPages = 1;  
          } else {
            this.filteredResearchers = [];
          }
        },
        error: () => {
          console.error('Error fetching author:', this.searchQuery);
          this.filteredResearchers = [];
          alert('No researchers found for the given name.');
        }
      });
    }
  }
  
  // Function to search for a researcher
  searchResearcher() {

    if (this.searchQuery === '') {
      this.filteredResearchers = this.researchers; // Reset filtered results if empty query
      this.totalPages = Math.ceil(this.totalResearchers / this.pageSize);
      return;
    } else {
    this.authorService.getAuthorByName(this.searchQuery).subscribe({
        next: (data) => {
          this.filteredResearchers = data ? [data] : [];
          this.totalPages = Math.ceil(this.filteredResearchers.length / this.pageSize);
        },
        error: () => {
          console.error('Error fetching author:', this.searchQuery);
          this.filteredResearchers = [];
          alert('No researchers found for the given name.');
          this.totalPages = 1;
        }
      });
    }
  }
  

  resetSearch() {
    this.searchQuery = '';
    this.filteredResearchers = this.researchers;
    this.currentPage = 1;
    this.fetchResearchers();
  }

  // This function listens for the Enter event and triggers the searchByAuthor function
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchQuery !== '') {
      this.searchResearcher();
    }
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
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchResearchers();
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchResearchers();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to top
    });
  }

}
