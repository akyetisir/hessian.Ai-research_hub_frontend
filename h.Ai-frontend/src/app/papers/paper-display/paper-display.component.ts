import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paper-display',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './paper-display.component.html',
  styleUrl: './paper-display.component.less'
})
export class PaperDisplayComponent {
  paperTitle: string | null = '';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.paperTitle = params.get('title');
    });
  }
}
