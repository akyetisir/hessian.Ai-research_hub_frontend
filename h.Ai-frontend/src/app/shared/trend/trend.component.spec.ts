import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TrendComponent } from './trend.component';
import { PaperService } from '../../services/paper/paper.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TrendComponent', () => {
  let component: TrendComponent;
  let fixture: ComponentFixture<TrendComponent>;
  let paperServiceSpy: jasmine.SpyObj<PaperService>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [TrendComponent, HttpClientTestingModule, HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
