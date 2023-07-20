import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUserComponent } from './profil-user.component';

describe('ProfilUserComponent', () => {
  let component: ProfilUserComponent;
  let fixture: ComponentFixture<ProfilUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilUserComponent]
    });
    fixture = TestBed.createComponent(ProfilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
