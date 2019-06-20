import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLangModalComponent } from './new-lang-modal.component';

describe('NewLangModalComponent', () => {
  let component: NewLangModalComponent;
  let fixture: ComponentFixture<NewLangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLangModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
