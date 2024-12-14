import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveLogoComponent } from './wave-logo.component';

describe('WaveLogoComponent', () => {
  let component: WaveLogoComponent;
  let fixture: ComponentFixture<WaveLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaveLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
