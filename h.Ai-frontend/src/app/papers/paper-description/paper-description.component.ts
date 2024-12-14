import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaperService } from '../../services/paper/paper.service';



@Component({
  selector: 'app-paper-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paper-description.component.html',
  styleUrl: './paper-description.component.less'
})


export class PaperDescriptionComponent implements OnInit {
  paper: any;

  paperTitle: string | null = '';

  constructor(private route: ActivatedRoute, private paperService: PaperService) {
    this.route.paramMap.subscribe(params => {
      this.paperTitle = params.get('title');
    });
  }

  ngOnInit(): void {
    const paperId = this.route.snapshot.paramMap.get('id');
    if (paperId) {
      this.paperService.getPapersById(paperId).subscribe((data: any) => {
        this.paper = data;
      });
    }
  }

}
