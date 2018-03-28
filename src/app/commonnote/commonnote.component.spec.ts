import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonnoteComponent } from './commonnote.component';

describe('CommonnoteComponent', () => {
  let component: CommonnoteComponent;
  let fixture: ComponentFixture<CommonnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
