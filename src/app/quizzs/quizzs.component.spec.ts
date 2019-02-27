import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzsComponent } from './quizzs.component';

describe('QuizzsComponent', () => {
  let component: QuizzsComponent;
  let fixture: ComponentFixture<QuizzsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
