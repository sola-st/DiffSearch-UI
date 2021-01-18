import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QueryService } from '../query.service';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let service: QueryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ],
        providers: [
          QueryService,
        ],
      declarations: [ ResultComponent ]
    })
    .compileComponents();
    service = TestBed.inject(QueryService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (inject([HttpTestingController, QueryService],
      (httpMock: HttpTestingController, apiService: QueryService) => {
      expect(component).toBeTruthy();
    }))
  );
});
