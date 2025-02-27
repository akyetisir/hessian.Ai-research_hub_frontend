
import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PaperDisplayComponent } from './papers/paper-display/paper-display.component';
import { ResearchersComponent } from './researchers/researchers.component';

// Routes declaration
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Automatical Navigation to Home
    { path: 'home', component: HomepageComponent },        // Route for Homepage
    { path: 'search', component: SearchPageComponent },    // Route for Search-page
    { path: 'paper/:title', component: PaperDisplayComponent},      // Route for Paper Details
    { path: 'researchers', component: ResearchersComponent }, // Route for Researchers
    { path: 'search/:researcherName', component: SearchPageComponent }, // Search by Researcher Name
    { path: '**', redirectTo: '/home' }                    // Navigation to Homepage if there is no route
];
