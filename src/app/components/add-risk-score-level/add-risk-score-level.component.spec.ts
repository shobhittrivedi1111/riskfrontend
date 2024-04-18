import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiskScoreLevelComponent } from './add-risk-score-level.component';

describe('AddRiskScoreLevelComponent', () => {
  let component: AddRiskScoreLevelComponent;
  let fixture: ComponentFixture<AddRiskScoreLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRiskScoreLevelComponent]
    });
    fixture = TestBed.createComponent(AddRiskScoreLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
