import { Component, OnInit } from '@angular/core';
import { PaperService } from '../../services/paper/paper.service';
import { Paper } from '../../shared/models/paper.model';
import { PaperDescriptionComponent } from '../paper-description/paper-description.component';

@Component({
  selector: 'app-paper-list',
  standalone: true,
  imports: [PaperDescriptionComponent],
  templateUrl: './paper-list.component.html',
  styleUrl: './paper-list.component.less'
})

export class PaperListComponent implements OnInit{

  papers: Paper[] = [];

  constructor(private paperService: PaperService) {}

  ngOnInit(): void {
    this.paperService.getAllPapers().subscribe({
      next: (data) => {
        this.papers = data;
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      }
    });
  }
}
