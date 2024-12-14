
import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PaperDisplayComponent } from './papers/paper-display/paper-display.component';
import { PaperDescriptionComponent } from './papers/paper-description/paper-description.component';

// Routes declaration
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Automatical Navigation to Home
    { path: 'home', component: HomepageComponent },        // Route for Homepage
    { path: 'search', component: SearchPageComponent },    // Route for Search-page
    { path: 'paper/:title', component: PaperDisplayComponent },      // Route for Paper Details
    { path: '**', redirectTo: '/home' }                    // Navigation to Homepage if there is no route
];
