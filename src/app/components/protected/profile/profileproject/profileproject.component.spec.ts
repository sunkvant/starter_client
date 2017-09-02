import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileprojectComponent } from './profileproject.component';

describe('ProfileprojectComponent', () => {
  let component: ProfileprojectComponent;
  let fixture: ComponentFixture<ProfileprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
