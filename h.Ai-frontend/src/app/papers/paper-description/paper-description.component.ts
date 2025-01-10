import { Component, Input, OnInit } from '@angular/core';
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
  @Input() paper: Paper | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private paperService: PaperService) {  }

  ngOnInit(): void {
    // const title = this.route.snapshot.paramMap.get('title');
    // if (title) {
    //   this.paperService.getPapersViaTitle(title).subscribe({
    //     next: (data: Paper | null) => {
    //         this.paper = data;
    //     },
    //     error: (err) => {
    //       this.errorMessage = 'Error fetching paper details!';
    //       console.error('Error:', err);
    //     }
    //   });
    // }
  }

}
