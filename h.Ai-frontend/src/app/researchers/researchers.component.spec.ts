import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ResearchersComponent } from './researchers.component';
import { AuthorService } from '../services/author/author.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



describe('ResearchersComponent', () => {
  let component: ResearchersComponent;
  let fixture: ComponentFixture<ResearchersComponent>;
  let authorServiceSpy: jasmine.SpyObj<AuthorService>;

  beforeEach(async () => {
    // Create a spy object for AuthorService
    authorServiceSpy = jasmine.createSpyObj('AuthorService', ['getAllAuthors', 'getAuthorByName']);
    authorServiceSpy.getAllAuthors.and.returnValue(of({
      page: 1,
      page_size: 15,
      total_count: 0,
      authors: []
    }));
    authorServiceSpy.getAuthorByName.and.returnValue(of({
      authorId: '1',
      name: 'Test Author',
      h_index: 10,
      citations: 100,
      highly_influential_citations: 5,
      image_path: 'assets/icons/papers_icon.png'
    }));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ResearchersComponent],
      providers: [
        { provide: AuthorService, useValue: authorServiceSpy },
        {
          provide: ActivatedRoute,
            useValue: {
              snapshot: {
                queryParams: { authorName: 'Test Author' }
              }
            }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
