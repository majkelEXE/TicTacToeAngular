import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePrepareComponent } from './game-prepare.component';

describe('GamePrepareComponent', () => {
  let component: GamePrepareComponent;
  let fixture: ComponentFixture<GamePrepareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamePrepareComponent]
    });
    fixture = TestBed.createComponent(GamePrepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
