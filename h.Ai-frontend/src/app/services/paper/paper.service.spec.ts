import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PaperService } from './paper.service';

describe('PaperService', () => {
  let service: PaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
