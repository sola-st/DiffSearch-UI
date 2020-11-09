import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffsearchComponent } from './diffsearch.component';

describe('DiffsearchComponent', () => {
  let component: DiffsearchComponent;
  let fixture: ComponentFixture<DiffsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiffsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
