import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../shared/footer/footer.component";
import { PaperService } from '../services/paper/paper.service';
import { Paper } from '../shared/models/paper.model';
import { PaperDescriptionComponent } from '../papers/paper-description/paper-description.component';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../services/author/author.service';
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

  searchOption: string = 'author'; // Default search by Author
  authorQuery: any;

  teamMembers: Author[] = [];


  // Filters
  filters: {
    selectedCitations: { [key: string]: boolean },
    selectedYears: { [key: string]: boolean },
    selectedViews: { [key: string]: boolean }
  } = {
    selectedCitations: {},
    selectedYears: {},
    selectedViews: {}
  };

   // filterState object to control visibility of filters
   filterState = {
    citations: false,
    publishYear: false,
    views: false
  };


  // Methods for toggle behavior of filter sections
  toggleFilter(filter: keyof typeof this.filterState): void {
    // Toggle the boolean value of the corresponding filter state
    this.filterState[filter] = !this.filterState[filter];
  }
  

  applyFilters(): void {
    let params: any = {};

    // Filter the papers based on the selected years
    const selectedYears = Object.keys(this.filters.selectedYears).filter(year => this.filters.selectedYears[year]);
    if (selectedYears.length > 0) {
      params.year = selectedYears;
    }


    // Function to get the range of views and citations
    const range = (option: string) => {
      if (option === 'Under 10') return { min: 0, max: 9 };
      if (option === '10 to 100') return { min: 10, max: 100 };
      if (option === '100 to 500') return { min: 100, max: 500 };
      if (option === '500 to 1000') return { min: 500, max: 1000 };
      if (option === 'Over 1000') return { min: 1001, max: Infinity };
      return null;
    };
    // Filter the papers based on the selected views
    const selectedViews = this.viewsOptions.filter(view => this.filters.selectedViews[view]);
    if (selectedViews.length > 0) {
      const ranges = selectedViews.map(range);
      params.min_views = Math.min(...ranges.map(r => r ? r.min : Infinity));
      params.max_views = Math.max(...ranges.map(r => r ? r.max : -Infinity));
    }
    // Filter the papers based on the selected citations
    const selectedCitations = Object.keys(this.filters.selectedCitations).filter(citation => this.filters.selectedCitations[citation]);
    if (selectedCitations.length > 0) {
      const ranges = selectedCitations.map(range);
      params.min_citations = Math.min(...ranges.map(r => r ? r.min : Infinity));
      params.max_citations = Math.max(...ranges.map(r => r ? r.max : -Infinity));
    }
    
    console.log('Filter params:', params);
  
    // Sort the filtered results
    this.sortResults();
    
    // After applying filters, reset to the first page
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredPapers.length / this.papersPerPage);
    
  }


  
  
  resetFilters(): void {
    this.filters.selectedCitations = {};
    this.filters.selectedYears = {};
    this.filters.selectedViews = {};
    this.applyFilters(); // Reapply filter to update the results
  }

  // researchAreas = [
  //   'Machine Learning', '(Probabilistic) Deep Learning', 'Statistical Relational AI', 
  //   'Computer Vision', 'Natural Language Processing', 'Robotics', 'Models of Higher Cognition',
  //   'Psychology of Information Processing', 'Database Systems', 'Software Engineering', 
  //   'Distributed Systems', 'Hardware', 'Bioinformatics', 'Semantic Web', 'Sustainability',
  //   'Medicine', 'Finance', 'Multimodal AI'
  // ];

  publishYears = ['2020', '2021', '2022', '2023', '2024', '2025'];
  
  viewsOptions = ['Under 10', '10 to 100', '100 to 500', '500 to 1000', 'Over 1000'];
  
  citationsOptions = ['Under 10', '10 to 100', '100 to 500', '500 to 1000', 'Over 1000']; 
  


  constructor (private paperService: PaperService, private authorService: AuthorService) {}
  ngOnInit(): void {
    this.fetchPapers();
    console.log(this.papers);
    this.fetchTeamMembers();
    console.log(this.teamMembers);
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
// Function to handle search by author
searchByAuthor(): void {
  this.currentPage = 1;
  if (this.searchOption === 'author') {
    this.paperService.getPapersViaAuthor(this.searchQuery, this.currentPage, this.papersPerPage).subscribe({
      next: (response) => {
        this.papers = response.papers;
        this.totalPages = Math.ceil(response.totalPapers / this.papersPerPage);
      },
      error: (err) => {
        console.error('Error fetching papers by author:', err);
        this.papers = [];
        alert('No papers found for the given author.');
      }
    });
  }
}

// Function to handle search by title
searchByTitle(): void {
  this.currentPage = 1;
  if (this.searchOption === 'title') {
    this.paperService.getPapersViaTitle(this.searchQuery, this.currentPage, this.papersPerPage).subscribe({
      next: (response) => {
        this.papers = response.papers;
        this.totalPages = Math.ceil(response.totalPapers / this.papersPerPage);
      },
      error: (err) => {
        console.error('Error fetching papers by title:', err);
        this.papers = [];
        alert('No papers found for the given title.');
      }
    });
  }
}

searchByContent(): void {
  this.currentPage = 1;
  if (this.searchOption === 'content') {
    this.paperService.getPapersViaContent(this.searchQuery, this.currentPage, this.papersPerPage).subscribe({
      next: (response) => {
        this.papers = response.papers;
        this.totalPages = Math.ceil(response.totalPapers / this.papersPerPage);
      },
      error: (err) => {
        console.error('Error fetching papers by content:', err);
        this.papers = [];
        alert('No papers found for the given content.');
      }
    });
  }
}


  // Function to trigger the correct search based on the selected option
  perfomSearch(): void {
    this.currentPage = 1;
    if (this.searchOption === 'author') {
      this.searchByAuthor();
    } else if (this.searchOption === 'title') {
      this.searchByTitle();
    } else if (this.searchOption === 'content') {
      this.searchByContent();
    }
  }

  // This function listens for the Enter event and triggers the searchByAuthor function
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.perfomSearch();
    }
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.searchOption = 'author';
    this.currentPage = 1;
    this.sortOption = 'Date (new to old)';
    this.resetFilters();
    this.fetchPapers(); 
  }

}
