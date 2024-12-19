import { Component } from '@angular/core';
import { CommonModule, NgFor} from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from '../../services/paper/paper.service';
import { Paper } from '../../shared/models/paper.model';

@Component({
  selector: 'app-paper-display',
  standalone: true,
  imports: [CommonModule, NgFor, HeaderComponent, FooterComponent],
  templateUrl: './paper-display.component.html',
  styleUrl: './paper-display.component.less'
})
export class PaperDisplayComponent {
  paper: Paper | null = null;

  constructor(private route: ActivatedRoute, private paperService: PaperService) {  }

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.paperService.getPapersViaTitle(title).subscribe(
        (data: Paper | null) => {
          if (data) {
            this.paper = data;
          } else {
            console.error('Cannot find paper with this title.');
          }
        },
        (error: any) => {
          console.error('Error fetching paper:', error);
        }
      );
    }
  }
}
