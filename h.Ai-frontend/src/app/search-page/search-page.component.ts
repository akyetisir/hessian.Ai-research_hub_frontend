import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../shared/footer/footer.component";
import { PaperService } from '../services/paper/paper.service';
import { Paper } from '../shared/models/paper.model';
import { PaperDescriptionComponent } from '../papers/paper-description/paper-description.component';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, 
    HeaderComponent, FormsModule, NgIf, NgFor, CommonModule, FooterComponent, PaperDescriptionComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.less'
})

export class SearchPageComponent implements OnInit {

  papers: Paper[] = [];
  searchQuery: string = '';
  selectedArea = '';
  sortOption: string = 'Date (new to old)'; // Default criteria for sorting
  sortOptions: string[] = [
    'Date (new to old)', 'Date (old to new)',
    'Views (high to low)', 'Views (low to high)',
    'Relevance'];
  currentPage = 1;
  totalPages = 68;
  //filters = ['selectedAreas', 'selectedYears', 'views' ];
  filteredPapers: Paper[] = [];

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
    this.paperService.getAllPapers().subscribe({
      next: (data: Paper[]) => {
        if (data && data.length > 0) {
          this.papers = data; // Store the fetched papers in the papers array
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





    
  
  get searchedPapers() {
    return this.papers
      .filter(paper => paper.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
  
  
  selectArea(area: any) {      
    this.selectedArea = area.name;
  }
  
  resetSearch(): void {
    this.searchQuery = '';
    this.selectedArea = '';
  }

  toggleYearFilter() {
    console.log('Year filter toggled');
  }

  previousPage() {
    if ( this.currentPage > 1 && this.currentPage < this.totalPages) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage > 0 && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }





//     // Test if the data is called from backend
// ngOnInit(): void {
//   this.paperService.getPapersByAuthor('John Doe').subscribe({
//     next: (data) => console.log('Papers fetched successfully:', data),
//     error: (err) => console.error('Error fetching papers:', err)
//   });
// }

}
