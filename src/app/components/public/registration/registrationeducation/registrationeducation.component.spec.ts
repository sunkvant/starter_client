import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationeducationComponent } from './registrationeducation.component';

describe('RegistrationeducationComponent', () => {
  let component: RegistrationeducationComponent;
  let fixture: ComponentFixture<RegistrationeducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationeducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationeducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
