import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionIndicesComponent } from './question-indices.component';

describe('QuestionIndicesComponent', () => {
  let component: QuestionIndicesComponent;
  let fixture: ComponentFixture<QuestionIndicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionIndicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
