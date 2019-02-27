import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzShowQuestionComponent } from './quizz-show-question.component';

describe('QuizzShowQuestionComponent', () => {
  let component: QuizzShowQuestionComponent;
  let fixture: ComponentFixture<QuizzShowQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzShowQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzShowQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
