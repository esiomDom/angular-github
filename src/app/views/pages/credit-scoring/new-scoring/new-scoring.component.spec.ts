import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScoringComponent } from './new-scoring.component';

describe('TableauDeBordComponent', () => {
  let component: NewScoringComponent;
  let fixture: ComponentFixture<NewScoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewScoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
