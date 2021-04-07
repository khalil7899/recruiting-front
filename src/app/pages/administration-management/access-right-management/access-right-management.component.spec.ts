import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRightManagementComponent } from './access-right-management.component';

describe('AccessRightManagementComponent', () => {
  let component: AccessRightManagementComponent;
  let fixture: ComponentFixture<AccessRightManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessRightManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRightManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
