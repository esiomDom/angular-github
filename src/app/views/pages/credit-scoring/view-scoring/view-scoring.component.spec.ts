import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScoringComponent } from './view-scoring.component';

describe('TableauDeBordComponent', () => {
  let component: ViewScoringComponent;
  let fixture: ComponentFixture<ViewScoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
