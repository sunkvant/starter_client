import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationprofileComponent } from './registrationprofile.component';

describe('RegistrationprofileComponent', () => {
  let component: RegistrationprofileComponent;
  let fixture: ComponentFixture<RegistrationprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
