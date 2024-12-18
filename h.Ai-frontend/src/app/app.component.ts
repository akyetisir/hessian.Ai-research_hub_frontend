import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, provideRouter, Route } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomepageComponent } from "./homepage/homepage.component";
import { HeaderComponent } from './shared/header/header.component';
import { IntroductionComponent } from './shared/introduction/introduction.component';
import { CategoryComponent } from './shared/category/category.component';
import { WaveLogoComponent } from './shared/wave-logo/wave-logo.component';
import { TrendComponent } from './shared/trend/trend.component';
import { routes } from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, SearchPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'h.Ai-frontend';
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Sử dụng provideRouter để cung cấp các routes
}).catch((err) => console.error(err));


