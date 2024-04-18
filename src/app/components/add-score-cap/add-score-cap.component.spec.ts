import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScoreCapComponent } from './add-score-cap.component';

describe('AddScoreCapComponent', () => {
  let component: AddScoreCapComponent;
  let fixture: ComponentFixture<AddScoreCapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScoreCapComponent]
    });
    fixture = TestBed.createComponent(AddScoreCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
