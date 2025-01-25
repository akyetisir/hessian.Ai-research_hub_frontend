import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-researchers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './researchers.component.html',
  styleUrl: './researchers.component.less'
})
export class ResearchersComponent {

}
