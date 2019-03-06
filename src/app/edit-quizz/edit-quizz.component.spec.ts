import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizzComponent } from './edit-quizz.component';

describe('EditQuizzComponent', () => {
  let component: EditQuizzComponent;
  let fixture: ComponentFixture<EditQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
