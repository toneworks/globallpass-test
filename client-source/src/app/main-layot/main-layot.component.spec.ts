import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayotComponent } from './main-layot.component';

describe('MainLayotComponent', () => {
  let component: MainLayotComponent;
  let fixture: ComponentFixture<MainLayotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
