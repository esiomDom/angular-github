import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyBComponent } from './kyb.component';

describe('KyBComponent', () => {
  let component: KyBComponent;
  let fixture: ComponentFixture<KyBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KyBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KyBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
