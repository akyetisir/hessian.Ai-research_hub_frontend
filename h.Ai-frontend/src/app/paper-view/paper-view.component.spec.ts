import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperViewComponent } from './paper-view.component';

describe('PaperViewComponent', () => {
  let component: PaperViewComponent;
  let fixture: ComponentFixture<PaperViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
