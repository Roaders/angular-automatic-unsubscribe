import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleChildComponent } from './sample-child.component';

describe('SampleChildComponent', () => {
  let component: SampleChildComponent;
  let fixture: ComponentFixture<SampleChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
