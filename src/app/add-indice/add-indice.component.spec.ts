import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndiceComponent } from './add-indice.component';

describe('AddIndiceComponent', () => {
  let component: AddIndiceComponent;
  let fixture: ComponentFixture<AddIndiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
