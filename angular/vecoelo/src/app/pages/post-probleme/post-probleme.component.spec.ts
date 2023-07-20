import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProblemeComponent } from './post-probleme.component';

describe('PostProblemeComponent', () => {
  let component: PostProblemeComponent;
  let fixture: ComponentFixture<PostProblemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostProblemeComponent]
    });
    fixture = TestBed.createComponent(PostProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
