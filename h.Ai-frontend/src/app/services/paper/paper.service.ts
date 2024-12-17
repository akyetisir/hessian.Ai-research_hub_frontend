import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paper } from '../../shared/models/paper.model'; 

@Injectable({
  providedIn: 'root'
})

export class PaperService {

  private baseUrl = 'http://localhost:8000'; // URL of Backend

  constructor(private http: HttpClient) { }

  // Function to convert backend data into Paper object
  private mapToPaper (data:any): Paper {
    return {
      id: data.id,
      title: data.title,
      date: new Date(data.date), 
      authors: data.authors || [], // If there is no author, return blank
      relevance: data.relevance,
      tags: data.tags || [],
      abstract: data.abstract,
      views: data.views,
      pdfUrl: data.pdfUrl,
      source: data.source,
      citationCount: data.citationCount,
    };
  }

  // Get all papers
  getAllPapers(): Observable<Paper[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(response => response.map(this.mapToPaper))
    );
  }




  // Get all papers by author name
  getPapersViaAuthor (authorName: string): Observable<Paper[]> {
    return this.http.get<any[]>(`${this.baseUrl}/papers/author/${encodeURIComponent(authorName)}`).pipe(
      map(response => response.map(this.mapToPaper))
    );
  }

  // Get all papers by tag
  getPapersViaTag (paperTag: string): Observable<Paper[]> {
    return this.http.get<any[]>(`${this.baseUrl}/papers/tag/${encodeURIComponent(paperTag)}`).pipe(
      map(response => response.map(this.mapToPaper))
    );
  }

  // Get all papers by title
  getPapersViaTitle (paperTitle: string): Observable<Paper | null> {
    return this.http.get<any[]>(`${this.baseUrl}/papers/title/${encodeURIComponent(paperTitle)}`).pipe(
      map(response => response.length > 0 ? this.mapToPaper(response[0]) : null)
    );
  }

  // Get all papers by ID
  getPapersViaId (id: string): Observable<Paper[]> {
    return this.http.get<any[]>(`${this.baseUrl}/papers/id/${encodeURIComponent(id)}`).pipe(
      map(response => response.map(this.mapToPaper))
    );
  }

}

