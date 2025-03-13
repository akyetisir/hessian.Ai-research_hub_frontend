import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaperDisplayComponent } from './paper-display.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { PaperService } from '../../services/paper/paper.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { query } from '@angular/animations';

describe('PaperDisplayComponent', () => {
  let component: PaperDisplayComponent;
  let fixture: ComponentFixture<PaperDisplayComponent>;
  let paperServiceSpy: jasmine.SpyObj<PaperService>;;

  beforeEach(async () => {
    // Create a spy object for AuthorService
    paperServiceSpy = jasmine.createSpyObj('PaperService', ['getAllPapers', 'getPapersViaAuthor', 'getPapersViaTag', 'getPapersViaId', 'getPapersViaContent', 'getPapersViaTitle']);
    
    paperServiceSpy.getAllPapers.and.returnValue(of({
      page: 1,
      pageSize: 15,
      sort: "",
      descending: true,
      filterYears: [],
      minViews: 0,
      maxViews: 100000,
      minCitations: 0,
      maxCitations: 100000,
      papers: [],
      totalPapers: 0
    }));
    paperServiceSpy.getPapersViaAuthor.and.returnValue(of({
      page: 1,
      pageSize: 15,
      sort: "",
      descending: true,
      papers: [],
      totalPapers: 0
    }));
    paperServiceSpy.getPapersViaTitle.and.returnValue(of({
      page: 1,
      pageSize: 15,
      sort: "",
      descending: true,
      papers: [],
      totalPapers: 0
    }));
    paperServiceSpy.getPapersViaContent.and.returnValue(of({
      page: 1,
      pageSize: 15,
      sort: "",
      descending: true,
      papers: [],
      totalPapers: 0
    }));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserModule, PaperDisplayComponent],
      providers: [
        { provide: PaperService, useValue: paperServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test_paper_display' }),
            snapshot: {
              paramMap: {
                get: (key: string) => 'test_paper_display'
              }
            }
          }
        },
        DomSanitizer
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaperDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch papers on initialization', () => {
  //   expect(paperServiceSpy.getAllPapers).toHaveBeenCalled();
  // });

  // it('should handle search by title', () => {
  //   component.searchByTitle('test title');
  //   expect(paperServiceSpy.getPapersViaTitle).toHaveBeenCalledWith('test title', 1, 15, '', true);
  // });

  // it('should handle search by author', () => {
  //   component.searchByAuthor('test author');
  //   expect(paperServiceSpy.getPapersViaAuthor).toHaveBeenCalledWith('test author', 1, 15, '', true);
  // });

  // it('should handle search by content', () => {
  //   component.searchByContent('test content');
  //   expect(paperServiceSpy.getPapersViaContent).toHaveBeenCalledWith('test content', 1, 15, '', true);
  // });
});
