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

  // // Data Examples
  // researchAreas = [
  //   { name: 'Machine Learning', color: 'blue' },
  //   { name: 'Deep Learning', color: 'green' },
  //   { name: 'Computer Vision', color: 'red' },
  //   { name: 'Database Systems', color: 'orange' },
  // ];

  papers: Paper[] = [];
  searchQuery: string = '';
  selectedArea = '';
  sortOption: string = 'Date';
  currentPage = 1;
  totalPages = 68;

  // Drop down section
  // Array to hold dropdown data
  dropdown = [
  // 1. Dropdown: Research areas (tags)
    { icon: 'none',
      heading : 'Research areas',
      isExpanded : false,
      childContents : ['Machine Learning', '(Probabilistic) Deep Learning', 'Statistical Relational AI', 
        'Computer Vision', 'Natural Language Processing', 'Robotics',
        'Models of Higher Cognition', 'Psychology of Information Processing', 'Database Systems',
        'Software Engineering', 'Distributed Systems', 'Hardware',
        'Bioinformatics','Semantic Web', 'Sustainability',
        'Medicine', 'Finance', 'Multimodal AI'
      ]
    },
    // 2. Dropdown: Publish year
    { icon: '',
      heading : 'Publish year',
      isExpanded : false,
      childContents : ['2020', '2021', '2022', '2023', '2024']
    },
  ];

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
          this.papers.sort((a,b) => b.date.getTime() - a.date.getTime());
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



  toggleDropdown(index: number) {
    this.dropdown[index].isExpanded = !this.dropdown[index].isExpanded;
    console.log('Dropdown toggled:', this.dropdown[index].isExpanded);
  }

    
  
  get filteredPapers() {
    return this.papers
      .filter(paper => paper.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
  
  selectArea(area: any) {      
    this.selectedArea = area.name;
  }
  
  resetFilters() {
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

  sortResults() {
    console.log('Sorting by:', this.sortOption);
  }



//     // Test if the data is called from backend
// ngOnInit(): void {
//   this.paperService.getPapersByAuthor('John Doe').subscribe({
//     next: (data) => console.log('Papers fetched successfully:', data),
//     error: (err) => console.error('Error fetching papers:', err)
//   });
// }

}
