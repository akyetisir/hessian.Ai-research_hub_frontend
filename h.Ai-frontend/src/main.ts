import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from'./app/app.routes';
import { HttpClientModule } from '@angular/common/http';



bootstrapApplication(AppComponent, {
  ...appConfig,
  
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));



