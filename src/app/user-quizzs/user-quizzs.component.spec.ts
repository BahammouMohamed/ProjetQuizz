import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzsComponent } from './user-quizzs.component';

describe('UserQuizzsComponent', () => {
  let component: UserQuizzsComponent;
  let fixture: ComponentFixture<UserQuizzsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizzsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
