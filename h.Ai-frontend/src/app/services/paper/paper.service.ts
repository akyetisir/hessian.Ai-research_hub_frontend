import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  private baseUrl = 'http://localhost:8000'; // URL of Backend

  constructor(private http: HttpClient) { }

  // Get all papers by author name
  getPapersByAuthor (authorName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/papers/author/${authorName}`);
  }

  // Get all papers by tag
  getPapersByTag (paperTag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/papers/author/${paperTag}`);
  }

  // Get all papers by title
  getPapersByTitle (paperTitle: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/papers/author/${paperTitle}`);
  }

  // Get all papers by ID
  getPapersById (id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/papers/author/${id}`);
  }

}
