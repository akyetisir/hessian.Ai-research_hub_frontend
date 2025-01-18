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
  private pdfBaseUrl = 'http://127.0.0.1:8000'; // URL of PDFs

  constructor(private http: HttpClient) { 
  }

  // Function to convert backend data into Paper object
  private mapToPaper (data:any): Paper {
    return {
      id: data._id,
      title: data.title,
      date: new Date(data.published), 
      authors: data.authors || [], // If there is no author, return blank
      relevance: data.relevance,
      tags: data.tags || [],
      abstract: data.abstract,
      views: data.views,
      pdfUrl: `${this.pdfBaseUrl}/${data.path || ''}`,
      source: data.journal || '',
      citations: data.citations,
      image: `${this.pdfBaseUrl}/${data.path_image || ''}`
    };
  }

  // Get all papers
  getAllPapers(page: number = 1, pageSize: number = 15): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ papers: any[], total_count: number }>(`${this.baseUrl}/papers/all`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }).pipe(
      map(response => {
        return {
          papers: response.papers.map((input)=>this.mapToPaper(input)),
          totalPapers: response.total_count
        }
      })
    );
  }
  






  // Get all papers by author name
  getPapersViaAuthor(authorName: string, page: number = 1, pageSize: number = 15): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/author/${encodeURIComponent(authorName)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input)=>this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }
  
  // Get all papers by tag
  getPapersViaTag(paperTag: string, page: number = 1, pageSize: number = 15): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/tag/${encodeURIComponent(paperTag)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input)=>this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }
  

  // Get all papers by title
  getPapersViaTitle(paperTitle: string, page: number = 1, pageSize: number = 15): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/title/${encodeURIComponent(paperTitle)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input) => this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }
  

  // Get all papers by ID
  getPapersViaId(id: string, page: number = 1, pageSize: number = 15): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/id/${encodeURIComponent(id)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input)=>this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }
  

}

