import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PaperDescriptionComponent } from '../../papers/paper-description/paper-description.component';




@Component({
  selector: 'app-trend',
  standalone: true,
  imports: [NgIf,NgFor,PaperDescriptionComponent],
  templateUrl: './trend.component.html',
  styleUrl: './trend.component.less'
})


export class TrendComponent {

  // Array to hold dropdown data
  dropdown = [
    // 1. Dropdown: HIGHEST RANKED PAPERS
    { icon: 'fa-solid fa-arrow-trend-up',
      heading : 'HIGHEST RANKED PAPERS',
      isExpanded : false,
      //childContents : [PaperDescriptionComponent, PaperDescriptionComponent, PaperDescriptionComponent]
    },
    // 2. Dropdown: HOTTEST PAPERS
    { icon: 'fa-solid fa-fire',
      heading : 'HOTTEST PAPERS',
      isExpanded : false,
      childContents : ['Hottest 1', 'Hottest 2', 'Hottest 3']
    },
    // 3. Dropdown: NEWEST PAPERS
    { icon: 'fa-solid fa-newspaper',
      heading : 'NEWEST PAPERS',
      isExpanded : false,
      childContents : ['Newest 1', 'Newest 2', 'Newest 3']
    },
  ];



  toggleDropdown(index: number) {
    this.dropdown[index].isExpanded = !this.dropdown[index].isExpanded;
    console.log('Dropdown toggled:', this.dropdown[index].isExpanded);
  }


}
