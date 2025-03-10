import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { IntroductionComponent } from "../shared/introduction/introduction.component";
import { CategoryComponent } from '../shared/category/category.component';
import { WaveLogoComponent } from '../shared/wave-logo/wave-logo.component';
import { TrendComponent } from '../shared/trend/trend.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, IntroductionComponent, CategoryComponent, WaveLogoComponent, TrendComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.less'
})
export class HomepageComponent {

}
