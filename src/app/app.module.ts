import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GamePrepareComponent } from './game-prepare/game-prepare.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameResultsComponent } from './game-results/game-results.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePrepareComponent,
    GamePlayComponent,
    GameBoardComponent,
    GameResultsComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
