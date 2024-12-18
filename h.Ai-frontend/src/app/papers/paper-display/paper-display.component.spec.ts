import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperDisplayComponent } from './paper-display.component';

describe('PaperDisplayComponent', () => {
  let component: PaperDisplayComponent;
  let fixture: ComponentFixture<PaperDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperDisplayComponent]
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
