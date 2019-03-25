import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionQuizzListComponent } from './revision-quizz-list.component';

describe('RevisionQuizzListComponent', () => {
  let component: RevisionQuizzListComponent;
  let fixture: ComponentFixture<RevisionQuizzListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionQuizzListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionQuizzListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
