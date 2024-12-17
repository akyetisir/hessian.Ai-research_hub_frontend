import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../shared/footer/footer.component";
import { PaperService } from '../services/paper/paper.service';
import { Paper } from '../shared/models/paper.model';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, 
    HeaderComponent, FormsModule, NgIf, NgFor, CommonModule, FooterComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.less'
})

export class SearchPageComponent {

  // Drop down section
 // Array to hold dropdown data
 dropdown = [
  // 1. Dropdown: Research areas
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



toggleDropdown(index: number) {
  this.dropdown[index].isExpanded = !this.dropdown[index].isExpanded;
  console.log('Dropdown toggled:', this.dropdown[index].isExpanded);
}

    // Data Examples
    researchAreas = [
      { name: 'Machine Learning', color: 'blue' },
      { name: 'Deep Learning', color: 'green' },
      { name: 'Computer Vision', color: 'red' },
      { name: 'Database Systems', color: 'orange' },
    ];
  
    papers = [
      { category: 'Natural Language Processing', title: 'Smart Audit System Empowered by LLM', authors: ['Xu Yao', 'Xiaoxu Xi', 'Ping Huang'], year: 2024, views: 2259 },
      { category: 'Computer Vision', title: 'Classifier-Free Guidance Is a Predictor-Corrector', authors: ['Arwen Bradley', 'Preetum Nakkiran'], year: 2024, views: 9201 },
      { category: 'Accessibility', title: 'Automated Code Fix Suggestions for Accessibility', authors: ['Forough Mehralian', 'Titus Barik', 'Jeff Nichols'], year: 2024, views: 615 },
      { category: 'Database Systems', title: 'Model-Driven Heart Rate Estimation', authors: ['Jingping Nie', 'Ran Liu'], year: 2024, views: 301 },
    ];
      // Function to get the color for a given category
  getCategoryColor(category: string): string {
    const foundCategory = this.researchAreas.find(area => area.name === category);
    return foundCategory ? foundCategory.color : 'gray';  // Default to gray if not found
  }
  
    searchQuery = '';
    selectedArea = '';
    sortOption = 'Newest';
    currentPage = 1;
    totalPages = 68;
  
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
