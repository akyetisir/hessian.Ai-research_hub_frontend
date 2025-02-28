import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';

import { FooterComponent } from "../shared/footer/footer.component";
import { PaperService } from '../services/paper/paper.service';
import { Paper } from '../shared/models/paper.model';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../services/author/author.service';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterLink, RouterModule, MatSliderModule, MatInputModule, CdkListbox, CdkOption,
    HeaderComponent, FormsModule, NgIf, NgFor, CommonModule, FooterComponent],
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
  MINVIEWS: number = 0;
  MAXVIEWS: number = 0;
  MINCITATIONS: number = 0;
  MAXCITATIONS: number = 0;
  currentPage = 1;
  totalPages: number = 1; // Initially set to 1
  papersPerPage: number = 15; // Number of papers per page
  filteredPapers: Paper[] = [];

  searchOption: string = 'author'; // Default search by Author
  authorQuery: any;

  // slider values
  sliderViewsMin: number = this.MINVIEWS
  sliderViewsMax: number = this.MAXVIEWS
  sliderCitationsMin: number = this.MINCITATIONS
  sliderCitationsMax: number = this.MAXCITATIONS

  teamMembers: Author[] = [];

  filterYears: string[] = [];
  

  sliderInput = 0
  endInputElement = 100000

  yearList = ['2020', '2021', '2022', '2023', '2024', '2025']

  constructor (private paperService: PaperService, private authorService: AuthorService) {}
  ngOnInit(): void {
    this.fetchPapers();
    console.log(this.papers);
    this.fetchTeamMembers();
    console.log(this.teamMembers);
  }

  // Function to fetch papers from the backend
  fetchPapers(): void {
    console.log('Fetching papers...');

    this.paperService.getAllPapers(this.currentPage, this.papersPerPage, '', true, this.filterYears, this.sliderViewsMin, 
      this.sliderViewsMax, this.sliderCitationsMin, this.sliderCitationsMax).subscribe({
      next: (data: { papers: Paper[], totalPapers: number }) => { // Receive totalPapers
        if (data.papers && data.papers.length > 0) {
          this.papers = data.papers; // Store the fetched papers in the papers array
          this.totalPages = Math.ceil(data.totalPapers / this.papersPerPage); // Calculate total pages based on totalPapers
          this.sortResults();
          console.log('Papers fetched successfully:', this.papers);
          if (this.MAXVIEWS == 0){
            this.calculateMaxSliderValues()
            this.sliderViewsMax = this.MAXVIEWS
          }
        } else {
          console.log('No papers found.');
        }
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      }
    });
  }

  calculateMaxSliderValues(){
    this.MAXVIEWS = this.papers.reduce(function(prev, current){
      return (prev.views > current.views) ? prev : current
    }).views
    this.MAXCITATIONS = this.papers.reduce(function(prev, current){
      return (prev.citations > current.citations) ? prev : current
    }).views
  }

  formatLabel(value: number): string {
    return value.toLocaleString();
  }

  onFilterChange(): void {
    console.log(this.filterYears)
    this.fetchPapers();
  }  
  
  
  resetFilters(): void {
      this.filterYears = [];
      this.sliderViewsMax = 0;
      this.sliderCitationsMax = 0;
      this.sliderViewsMin = 0;  
      this.sliderCitationsMin = 0;
  }


  // Function to sort all results
  sortResults(): void {
    if (this.sortOption === 'Date (new to old)') {
      this.filteredPapers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (this.sortOption === 'Date (old to new)') {
      this.filteredPapers.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortOption === 'Views (high to low)') {
      this.filteredPapers.sort((a, b) => b.views - a.views);
    } else if (this.sortOption === 'Views (low to high)') {
      this.filteredPapers.sort((a, b) => a.views - b.views);
    } else if (this.sortOption === 'Relevance') {
      this.filteredPapers.sort((a, b) => b.relevance - a.relevance);
    }
    console.log('Sorting by:', this.sortOption);
  }


  // Get the papers to display on the current page
  // TODO: only calc once or on change
  get displayedPapers(): Paper[] {
    const startIndex = (this.currentPage - 1) * this.papersPerPage;
    const endIndex = startIndex + this.papersPerPage;
    const papersToDisplay = this.filteredPapers.length > 0 ? this.filteredPapers : this.papers;
    // console.log('Displayed papers:', papersToDisplay); // Log displayed papers
    return this.filteredPapers.length > 0 ? this.filteredPapers : this.papers;
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
    if (this.currentPage < this.totalPages) {
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
    console.log("enter")
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

