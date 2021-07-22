import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTraineeComponent } from './list-trainee.component';

describe('ListTraineeComponent', () => {
  let component: ListTraineeComponent;
  let fixture: ComponentFixture<ListTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
