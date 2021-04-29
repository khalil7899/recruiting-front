import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesOffresComponent } from './mes-offres.component';

describe('MesOffresComponent', () => {
  let component: MesOffresComponent;
  let fixture: ComponentFixture<MesOffresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesOffresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
