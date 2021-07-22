import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCandidatByOffreComponent } from './dashboard-candidat-by-offre.component';

describe('DashboardCandidatByOffreComponent', () => {
  let component: DashboardCandidatByOffreComponent;
  let fixture: ComponentFixture<DashboardCandidatByOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCandidatByOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCandidatByOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
