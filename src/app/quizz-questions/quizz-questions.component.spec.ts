import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzQuestionsComponent } from './quizz-questions.component';

describe('QuizzQuestionsComponent', () => {
  let component: QuizzQuestionsComponent;
  let fixture: ComponentFixture<QuizzQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
