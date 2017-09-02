import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationprojectComponent } from './registrationproject.component';

describe('RegistrationprojectComponent', () => {
  let component: RegistrationprojectComponent;
  let fixture: ComponentFixture<RegistrationprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
