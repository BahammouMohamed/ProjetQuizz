import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionShowQuestionComponent } from './competition-show-question.component';

describe('CompetitionShowQuestionComponent', () => {
  let component: CompetitionShowQuestionComponent;
  let fixture: ComponentFixture<CompetitionShowQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionShowQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionShowQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
