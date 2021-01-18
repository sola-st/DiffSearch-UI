import { TestBed, inject} from '@angular/core/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QueryService } from './query.service';

describe('QueryService', () => {
  let service: QueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      HttpClientTestingModule,
      ],
      providers: [
        QueryService,
      ],
    });
    service = TestBed.inject(QueryService);
  });

  it('should be created', (inject([HttpTestingController, QueryService],
    (httpMock: HttpTestingController, apiService: QueryService) => {
    expect(service).toBeTruthy();
  }))
);
});
