import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaperDisplayComponent } from './paper-display.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

describe('PaperDisplayComponent', () => {
  let component: PaperDisplayComponent;
  let fixture: ComponentFixture<PaperDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserModule, PaperDisplayComponent],
      providers: [
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
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
