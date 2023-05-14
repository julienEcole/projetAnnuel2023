import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparateurProcheComponent } from './reparateur-proche.component';

describe('ReparateurProcheComponent', () => {
  let component: ReparateurProcheComponent;
  let fixture: ComponentFixture<ReparateurProcheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReparateurProcheComponent]
    });
    fixture = TestBed.createComponent(ReparateurProcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
