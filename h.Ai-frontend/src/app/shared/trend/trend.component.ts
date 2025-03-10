import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PaperDescriptionComponent } from '../../papers/paper-description/paper-description.component';
import { PaperService } from '../../services/paper/paper.service'
import { Paper } from '../../shared/models/paper.model';




@Component({
  selector: 'app-trend',
  standalone: true,
  imports: [NgIf, NgFor, PaperDescriptionComponent],
  templateUrl: './trend.component.html',
  styleUrl: './trend.component.less'
})


export class TrendComponent implements OnInit {

  papersByRank: Paper[] = [];
  papersByViews: Paper[] = [];
  papersByDate: Paper[] = [];


  constructor (private paperService: PaperService) {}
  ngOnInit(): void {
    this.dropdown.forEach(dropdown => {
      dropdown.isExpanded = false;
    });
    this.fetchByRank()
    this.fetchByViews()
    this.fetchByDate()
  }

  fetchByRank(): void {
    this.paperService.getAllPapers(1,3,"relevance", true, [], 0, 100000, 0, 100000).subscribe({
      next: (data: { papers: Paper[], totalPapers: number }) => { // Receive totalPapers
        if (data.papers && data.papers.length > 0) {
          this.papersByRank = data.papers; // Store the fetched papers in the papers array
          this.dropdown[0].childContents = data.papers
          console.log('Most relevant papers fetched successfully:', this.papersByRank);
        } else {
          console.log('No papers found.');
        }
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      }
    });
  }

  // TODO: only use papers from the past few weeks 
  fetchByViews(): void {
    this.paperService.getAllPapers(1,3,"views", true, [], 0, 100000, 0, 100000).subscribe({
      next: (data: { papers: Paper[], totalPapers: number }) => { // Receive totalPapers
        if (data.papers && data.papers.length > 0) {
          this.papersByViews = data.papers; // Store the fetched papers in the papers array
          this.dropdown[1].childContents = data.papers
          console.log('Most viewed papers fetched successfully:', this.papersByViews);
        } else {
          console.log('No papers found.');
        }
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      }
    });
  }

  fetchByDate(): void {
    this.paperService.getAllPapers(1,3,"date", true, [], 0, 100000, 0, 100000).subscribe({
      next: (data: { papers: Paper[], totalPapers: number }) => { // Receive totalPapers
        if (data.papers && data.papers.length > 0) {
          this.papersByDate = data.papers; // Store the fetched papers in the papers array
          this.dropdown[2].childContents = data.papers
          console.log('Newest papers fetched successfully:', this.papersByDate);
        } else {
          console.log('No papers found.');
        }
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      }
    });
  }

  // Array to hold dropdown data
  dropdown = [
    // 1. Dropdown: HIGHEST RANKED PAPERS
    { icon: 'fa-solid fa-arrow-trend-up',
      heading : 'HIGHEST RANKED PAPERS',
      isExpanded : true,
      childContents : this.papersByRank
    },
    // 2. Dropdown: HOTTEST PAPERS
    { icon: 'fa-solid fa-fire',
      heading : 'HOTTEST PAPERS',
      isExpanded : false,
      childContents : this.papersByViews
    },
    // 3. Dropdown: NEWEST PAPERS
    { icon: 'fa-solid fa-newspaper',
      heading : 'NEWEST PAPERS',
      isExpanded : false,
      childContents : this.papersByDate
    },
  ];

  toggleDropdown(index: number) {
    this.dropdown.forEach((dropdown, i) => {
      if (i !== index) {
        dropdown.isExpanded = false;
      }
    });

    this.dropdown[index].isExpanded = !this.dropdown[index].isExpanded;
    console.log('Dropdown toggled:', this.dropdown[index].isExpanded);
  }


}
