import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCandidatByDomainComponent } from './dashboard-candidat-by-domain.component';

describe('DashboardCandidatByDomainComponent', () => {
  let component: DashboardCandidatByDomainComponent;
  let fixture: ComponentFixture<DashboardCandidatByDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCandidatByDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCandidatByDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
