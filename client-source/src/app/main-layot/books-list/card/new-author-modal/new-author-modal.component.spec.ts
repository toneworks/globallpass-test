import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAuthorModalComponent } from './new-author-modal.component';

describe('NewAuthorModalComponent', () => {
  let component: NewAuthorModalComponent;
  let fixture: ComponentFixture<NewAuthorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAuthorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAuthorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
