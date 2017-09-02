import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpersonComponent } from './searchperson.component';

describe('SearchpersonComponent', () => {
  let component: SearchpersonComponent;
  let fixture: ComponentFixture<SearchpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
