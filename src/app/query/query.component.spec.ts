import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { QueryComponent } from './query.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QueryService } from '../query.service';
import { MatRadioModule } from '@angular/material/radio';

describe('QueryComponent', () => {
  let component: QueryComponent;
  let fixture: ComponentFixture<QueryComponent>;
  let service: QueryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatRadioModule
        ],
        providers: [
          QueryService,
        ],
      declarations: [ QueryComponent ]
    })
    .compileComponents();
    service = TestBed.inject(QueryService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (inject([HttpTestingController, QueryService],
    (httpMock: HttpTestingController, apiService: QueryService) => {
    expect(component).toBeTruthy();
  }))
  );
});
