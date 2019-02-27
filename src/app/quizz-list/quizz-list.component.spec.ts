import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzListComponent } from './quizz-list.component';

describe('QuizzListComponent', () => {
  let component: QuizzListComponent;
  let fixture: ComponentFixture<QuizzListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
