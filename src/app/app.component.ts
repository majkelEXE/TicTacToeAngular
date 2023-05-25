import { Component } from '@angular/core';
import { StartGame, startGameDefaults } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TicTacToeAngular';
  page = 'landing';
  gameProps: StartGame = startGameDefaults;
  message = '';
  startGame(props: StartGame) {
    this.gameProps = props;
    this.page = 'game';
  }
  endGame(props: { message: string }) {
    console.log('END GAME');
    this.page = 'end';
    this.message = props.message;
  }
}
