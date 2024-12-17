import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaperService } from '../../services/paper/paper.service';
import { Paper } from '../../shared/models/paper.model';



@Component({
  selector: 'app-paper-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paper-description.component.html',
  styleUrl: './paper-description.component.less'
})


export class PaperDescriptionComponent implements OnInit {
  paper: Paper | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private paperService: PaperService) {  }

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
  if (title) {
    this.paperService.getPapersByTitle(title).subscribe({
      next: (data: Paper[]) => {
        if (data.length > 0) {
          this.paper = data[0];  // Get the first paper from the array
        } else {
          this.errorMessage = 'No paper found with the given title.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error fetching paper details!';
        console.error('Error:', err);
      }
    });
  }
  }

}
