import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCalendrierComponent } from './mon-calendrier.component';

describe('MonCalendrierComponent', () => {
  let component: MonCalendrierComponent;
  let fixture: ComponentFixture<MonCalendrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCalendrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
