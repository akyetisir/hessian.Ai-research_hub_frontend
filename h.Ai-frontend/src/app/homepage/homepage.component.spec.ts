import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomepageComponent } from './homepage.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomepageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test_homepage' }),
            snapshot: {
              paramMap: {
                get: (key: string) => 'test_homepage'
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize data correctly', () => {
  //   // Assuming the component has an ngOnInit method that initializes some data
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   component.ngOnInit();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  //   // Add more expectations based on what ngOnInit does
  // });

});
