import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../shared/footer/footer.component";
import { PaperService } from '../services/paper/paper.service';
import { Paper } from '../shared/models/paper.model';
import { PaperDescriptionComponent } from '../papers/paper-description/paper-description.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule



@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, 
    HeaderComponent, FormsModule, NgIf, NgFor, CommonModule, FooterComponent, PaperDescriptionComponent,HttpClientModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.less'
})

export class SearchPageComponent implements OnInit {


  papers: Paper[] = [];
  searchQuery: string = '';
  
  sortOption: string = 'Date (new to old)'; // Default criteria for sorting
  sortOptions: string[] = [
    'Date (new to old)', 'Date (old to new)',
    'Views (high to low)', 'Views (low to high)',
    'Relevance'];
  currentPage = 1;
  totalPages: number = 1; // Initially set to 1
  papersPerPage: number = 15; // Number of papers per page
  filteredPapers: Paper[] = [];
  authorQuery: any;


  // Filters
  filters: {
    selectedAreas: { [key: string]: boolean },
    selectedYears: { [key: string]: boolean },
    selectedViews: { [key: string]: boolean }
  } = {
    selectedAreas: {},
    selectedYears: {},
    selectedViews: {}
  };

   // filterState object to control visibility of filters
   filterState = {
    researchAreas: false,
    publishYear: false,
    views: false
  };


  // Methods for toggle behavior of filter sections
  toggleFilter(filter: keyof typeof this.filterState): void {
    // Toggle the boolean value of the corresponding filter state
    this.filterState[filter] = !this.filterState[filter];
  }
  

  applyFilters(): void {
    // Filter the papers based on the selected filters
    this.filteredPapers = this.papers.filter(paper => {
      const areaMatches = Object.keys(this.filters.selectedAreas).length === 0 || 
                           Object.keys(this.filters.selectedAreas).some(area => this.filters.selectedAreas[area] && paper.tags.includes(area));
  
      const yearMatches = Object.keys(this.filters.selectedYears).length === 0 || 
                           Object.keys(this.filters.selectedYears).some(year => this.filters.selectedYears[year] && new Date(paper.date).getFullYear().toString() === year);
  
      const viewMatches = Object.keys(this.filters.selectedViews).length === 0 || 
                           Object.keys(this.filters.selectedViews).some(view => this.filters.selectedViews[view] && paper.views >= parseInt(view));
  
      return areaMatches && yearMatches && viewMatches;
    });
  
    // Sort the filtered results
    this.sortResults();
    
    // After applying filters, reset to the first page
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredPapers.length / this.papersPerPage);
    
  }
  
  
  resetFilters(): void {
    this.filters.selectedAreas = {};
    this.filters.selectedYears = {};
    this.filters.selectedViews = {};
    this.applyFilters(); // Reapply filter to update the results
  }

  researchAreas = [
    'Machine Learning', '(Probabilistic) Deep Learning', 'Statistical Relational AI', 
    'Computer Vision', 'Natural Language Processing', 'Robotics', 'Models of Higher Cognition',
    'Psychology of Information Processing', 'Database Systems', 'Software Engineering', 
    'Distributed Systems', 'Hardware', 'Bioinformatics', 'Semantic Web', 'Sustainability',
    'Medicine', 'Finance', 'Multimodal AI'
  ];

  publishYears = ['2020', '2021', '2022', '2023', '2024'];
  
  viewOptions = ['0', '100', '500', '1000', '5000']; 
  


  constructor (private paperService: PaperService) {}
  ngOnInit(): void {
    this.fetchPapers();
    console.log(this.papers);
  }

  // Function to fetch papers from the backend
  fetchPapers(): void {
    this.paperService.getAllPapers(this.currentPage, this.papersPerPage).subscribe({
      next: (data: { papers: Paper[], totalPapers: number }) => { // Receive totalPapers
        if (data.papers && data.papers.length > 0) {
          this.papers = data.papers; // Store the fetched papers in the papers array
          this.totalPages = Math.ceil(data.totalPapers / this.papersPerPage); // Calculate total pages based on totalPapers
          this.sortResults();
          console.log('Papers fetched successfully:', this.papers);
        } else {
          console.log('No papers found.');
        }
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      }
    });
  }


  // Function to sort all results
  sortResults(): void {
    if (this.sortOption === 'Date (new to old)') {
      this.papers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (this.sortOption === 'Date (old to new)') {
      this.papers.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortOption === 'Views (high to low)') {
      this.papers.sort((a, b) => b.views - a.views);
    } else if (this.sortOption === 'Views (low to high)') {
      this.papers.sort((a, b) => a.views - b.views);
    } else if (this.sortOption === 'Relevance') {
      this.papers.sort((a, b) => b.relevance - a.relevance);
    }
    console.log('Sorting by:', this.sortOption);
  }


  // Get the papers to display on the current page
  get displayedPapers(): Paper[] {
    const startIndex = (this.currentPage - 1) * this.papersPerPage;
    const endIndex = startIndex + this.papersPerPage;
    const papersToDisplay = this.filteredPapers.length > 0 ? this.filteredPapers : this.papers;
    console.log('Displayed papers:', papersToDisplay); // Log displayed papers
    return this.papers;
  }
  get searchedPapers() {
    return this.papers
      .filter(paper => paper.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
    




  previousPage() {
    if ( this.currentPage > 1) {
      this.currentPage--;
      this.fetchPapers();
      this.scrollToTop();
    }
  }

  nextPage() {
    if (this.currentPage > 0) {
      this.currentPage++;
      this.fetchPapers();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to top
    });
  }


  // Function to handle search
  searchByAuthor(): void {
    this.paperService.getPapersViaAuthor(this.authorQuery, this.currentPage, this.papersPerPage).subscribe({
      next: (response) => {
        this.papers = response.papers;
        this.totalPages = Math.ceil(response.totalPapers / this.papersPerPage);
      },
      error: (err) => {
        console.error('Error fetching papers by author:', err);
        this.papers = []; // Clear list if error occurs
        alert('No papers found for the given author.');
      }
    });
    }

  // This function listens for the Enter event and triggers the searchByAuthor function
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchByAuthor();
    }
  }

}
