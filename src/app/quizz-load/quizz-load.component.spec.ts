import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzLoadComponent } from './quizz-load.component';

describe('QuizzLoadComponent', () => {
  let component: QuizzLoadComponent;
  let fixture: ComponentFixture<QuizzLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
