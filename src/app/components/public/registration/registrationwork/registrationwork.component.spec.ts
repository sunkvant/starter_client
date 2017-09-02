import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationworkComponent } from './registrationwork.component';

describe('RegistrationworkComponent', () => {
  let component: RegistrationworkComponent;
  let fixture: ComponentFixture<RegistrationworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
