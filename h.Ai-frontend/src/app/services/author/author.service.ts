import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'; 
import { Author } from '../../shared/models/author.model';


export interface PaginatedAuthorsResponse {
  total_count: number;
  page: number;
  page_size: number;
  authors: Author[];
}


@Injectable({
  providedIn: 'root'
})

export class AuthorService {
  private API_BASE_URL = 'http://localhost:8000'; // URL of Backend

  constructor(private http: HttpClient) { }

  // Function to convert backend data into Author object
  private mapToAuthor(data: any): Author {
     // fs can't store ':' and replaces it with '_' so we need to reflect that here
     let image_path =  data.path_image? data.path_image.replaceAll(':', '_') : data.path_image
     
     return {
        authorId: data.objectId,
        name: data.name,
        h_index: data.h_index,
        citations: data.citations,
        highly_influential_citations: data.highly_influential_citations,
        image_path: `${this.API_BASE_URL}/${image_path || ''}`
      };
     } 

  // Get all authors
  getAllAuthors(page: number = 1, pageSize: number = 15): Observable<PaginatedAuthorsResponse> {
    return this.http.get<PaginatedAuthorsResponse>(`${this.API_BASE_URL}/authors`, 
    {
      params: {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }).pipe(
      map(response => ({
        ...response,
        authors: response.authors.map((input) => this.mapToAuthor(input))
      }))
    );
  }

  // Function to get author by name
  getAuthorByName(authorName: string): Observable<Author> {
    return this.http.get<Author>(`${this.API_BASE_URL}/authors/${authorName}`, {
      params: {
        name: authorName.toString()
      }
    });
  }

  // Function to get author by object id
  getAuthorById(objectId: string): Observable<Author> {
    return this.http.get<Author>(`${this.API_BASE_URL}/authors/objnr/${objectId}`, {
      params: { 
        authorId: objectId.toString() 
      }
    });
  }


}

