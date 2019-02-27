import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReponsesComponent } from './question-reponses.component';

describe('QuestionReponsesComponent', () => {
  let component: QuestionReponsesComponent;
  let fixture: ComponentFixture<QuestionReponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionReponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
