import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PaperDescriptionComponent } from './paper-description.component';

describe('PaperDescriptionComponent', () => {
  let component: PaperDescriptionComponent;
  let fixture: ComponentFixture<PaperDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, PaperDescriptionComponent],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
