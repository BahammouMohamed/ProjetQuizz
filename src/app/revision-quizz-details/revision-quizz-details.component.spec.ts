import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionQuizzDetailsComponent } from './revision-quizz-details.component';

describe('RevisionQuizzDetailsComponent', () => {
  let component: RevisionQuizzDetailsComponent;
  let fixture: ComponentFixture<RevisionQuizzDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionQuizzDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionQuizzDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
