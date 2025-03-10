import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Paper } from '../../shared/models/paper.model';  
import { HttpClientModule } from '@angular/common/http';



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

    // fs can't store ':' and replaces it with '_' so we need to reflect that here
    let image_path =  data.path_image? data.path_image.replaceAll(':', '_') : data.path_image 

    return {
      id: data._id,
      title: data.title,
      date: new Date(data.published), 
      authors: data.authors || [], // If there is no author, return blank
      relevance: data.relevance,
      tags: data.tags || [],
      abstract: data.abstract,
      citations: data.citations,
      views: data.views,
      pdfUrl: `${this.pdfBaseUrl}/${data.path || ''}`,
      source: data.journal || '',
      content: data.content || '',
      image: `${this.pdfBaseUrl}/${image_path || ''}`
    };
  }

  // Get all papers
  getAllPapers(page: number = 1, pageSize: number = 15, sort:string = "", descending :boolean = true, 
    filterYears: string[] = [], minViews: number = 0, maxViews: number = Infinity, minCitations: number = 0, maxCitations: number = Infinity)
    : Observable<{ papers: Paper[], totalPapers: number }> {
      let params = new HttpParams()
        .appendAll({
          page: page.toString(),
          page_size: pageSize.toString(),
          sort: sort.toString(),
          descending: descending.toString(),
          min_views: minViews.toString(),
          max_views: maxViews.toString(),
          min_citations: minCitations.toString(),
          max_citations: maxCitations.toString(),
          year: filterYears
        })

      return this.http.get<{ papers: any[], total_count: number }>(`${this.baseUrl}/papers/all`, {params: params}).pipe(
        map(response => {
          return {
            papers: response.papers.map((input)=>this.mapToPaper(input)),
            totalPapers: response.total_count
          }
        })
    );
  }


  // Get all papers by author name
  getPapersViaAuthor(authorName: string, page: number = 1, pageSize: number = 15, sort:string = "", descending :boolean = true): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/author/${encodeURIComponent(authorName)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString(),
        sort: sort.toString(),
        descending: descending.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input)=>this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }
  
  // Get all papers by tag
  getPapersViaTag(paperTag: string, page: number = 1, pageSize: number = 15, sort:string = "", descending :boolean = true): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/tag/${encodeURIComponent(paperTag)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString(),
        sort: sort.toString(),
        descending: descending.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input)=>this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }
  

  // Get all papers by title
  getPapersViaTitle(paperTitle: string, page: number = 1, pageSize: number = 15, sort:string = "", descending :boolean = true): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/title/${encodeURIComponent(paperTitle)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString(),
        sort: sort.toString(),
        descending: descending.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input) => this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }
  

  // Get all papers by ID
  getPapersViaId(id: string, page: number = 1, pageSize: number = 15, sort:string = "", descending :boolean = true): Observable<{ papers: Paper[], totalPapers: number }> {
    return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/id/${encodeURIComponent(id)}`, {
      params: {
        page: page.toString(),
        page_size: pageSize.toString(),
        sort: sort.toString(),
        descending: descending.toString()
      }
    }).pipe(
      map(response => ({
        papers: response.papers.map((input)=>this.mapToPaper(input)),
        totalPapers: response.total_count
      }))
    );
  }

  // Get all papers by content
  // Get all papers by content
getPapersViaContent(contentQuery: string, page: number = 1, pageSize: number = 15): Observable<{ papers: Paper[], totalPapers: number }> {
  return this.http.get<{ total_count: number, papers: any[] }>(`${this.baseUrl}/papers/content/${encodeURIComponent(contentQuery)}`, {
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
  

}

