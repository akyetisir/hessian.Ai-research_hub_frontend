import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResearchersComponent } from './researchers.component';
import { AuthorService } from '../services/author/author.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ResearchersComponent', () => {
  let component: ResearchersComponent;
  let fixture: ComponentFixture<ResearchersComponent>;
  let authorServiceSpy: jasmine.SpyObj<AuthorService>;

  beforeEach(async () => {
    // Create a spy object for AuthorService
    authorServiceSpy = jasmine.createSpyObj('AuthorService', ['getAuthors']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ResearchersComponent],
      declarations: [ResearchersComponent],
      providers: [
        { provide: AuthorService, useValue: authorServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test_researchers' }),
            snapshot: {
              paramMap: {
                get: (key: string) => 'test_researchers'
              }
            }
          }
        }
      ]
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
