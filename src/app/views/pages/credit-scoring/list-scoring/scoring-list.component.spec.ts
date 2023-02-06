import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoringListComponent } from './scoring-list.component';



describe('ScoringListComponent', () => {
  let component: ScoringListComponent ;
  let fixture: ComponentFixture<ScoringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
