import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilReparateurComponent } from './profil-reparateur.component';

describe('ProfilReparateurComponent', () => {
  let component: ProfilReparateurComponent;
  let fixture: ComponentFixture<ProfilReparateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilReparateurComponent]
    });
    fixture = TestBed.createComponent(ProfilReparateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
