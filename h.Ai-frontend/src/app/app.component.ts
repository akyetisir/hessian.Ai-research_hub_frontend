import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, provideRouter, Route } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'h.Ai-frontend';
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Provide our routes
}).catch((err) => console.error(err));


