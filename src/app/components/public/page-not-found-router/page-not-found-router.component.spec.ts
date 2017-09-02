import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundRouterComponent } from './page-not-found-router.component';

describe('PageNotFoundRouterComponent', () => {
  let component: PageNotFoundRouterComponent;
  let fixture: ComponentFixture<PageNotFoundRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
