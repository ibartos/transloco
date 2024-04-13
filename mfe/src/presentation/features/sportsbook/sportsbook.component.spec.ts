import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsbookComponent } from './sportsbook.component';

describe('SportsbookComponent', () => {
  let component: SportsbookComponent;
  let fixture: ComponentFixture<SportsbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportsbookComponent]
    });
    fixture = TestBed.createComponent(SportsbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
