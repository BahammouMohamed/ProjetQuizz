import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndiceComponent } from './edit-indice.component';

describe('EditIndiceComponent', () => {
  let component: EditIndiceComponent;
  let fixture: ComponentFixture<EditIndiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIndiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIndiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
