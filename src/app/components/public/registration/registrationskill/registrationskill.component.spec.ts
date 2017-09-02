import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationskillComponent } from './registrationskill.component';

describe('RegistrationskillComponent', () => {
  let component: RegistrationskillComponent;
  let fixture: ComponentFixture<RegistrationskillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationskillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
