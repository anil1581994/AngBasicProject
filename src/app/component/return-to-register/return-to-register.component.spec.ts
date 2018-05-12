import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToRegisterComponent } from './return-to-register.component';

describe('ReturnToRegisterComponent', () => {
  let component: ReturnToRegisterComponent;
  let fixture: ComponentFixture<ReturnToRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnToRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
