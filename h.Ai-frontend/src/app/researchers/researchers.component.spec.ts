import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchersComponent } from './researchers.component';

describe('ResearchersComponent', () => {
  let component: ResearchersComponent;
  let fixture: ComponentFixture<ResearchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchersComponent]
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
