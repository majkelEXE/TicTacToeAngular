import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardScheme } from '../data';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent {
  @Output() handleMove = new EventEmitter();
  @Input('n') n: number = 0;
  @Input() points: { x: number; o: number } = { x: 0, o: 0 };
  @Input('m') m: number = 0;

  @Input() boardState: BoardScheme = [];
}
