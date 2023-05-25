import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
})
export class GameResultsComponent {
  @Input() message = '';
  reset() {
    window.location.reload();
  }
}
