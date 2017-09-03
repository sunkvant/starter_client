import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchvacantionComponent } from './searchvacantion.component';

describe('SearchvacantionComponent', () => {
  let component: SearchvacantionComponent;
  let fixture: ComponentFixture<SearchvacantionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchvacantionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchvacantionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
