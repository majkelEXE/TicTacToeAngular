import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardScheme, FieldValue, StartGame, startGameDefaults } from '../data';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css'],
})
export class GamePlayComponent {
  @Input('props') gameProps: StartGame = startGameDefaults;
  @Output('handleEnd') end = new EventEmitter();
  board: BoardScheme | null = null;
  logs: string[] = [];

  points: { o: number; x: number } = { x: 0, o: 0 };
  gameIsFinished = false;

  playerMoved(p: { r: number; c: number }) {
    if (this.board) {
      this.board[p.r][p.c] = 1;
    }
    this.checkPoints();
    if (!this.gameIsFinished) {
      this.ai();
      this.checkPoints();
    }
  }
  reset() {
    this.points = { x: 0, o: 0 };
    if (this.board)
      for (let boardElement of this.board) {
        for (let i = 0; i < boardElement.length; i++) {
          boardElement[i] = 0;
        }
      }
  }

  generateBoard(): BoardScheme {
    if (this.board == null) {
      this.board = [];
      for (let i = 0; i < this.gameProps.m; i++) {
        let row: FieldValue[] = [];
        for (let j = 0; j < this.gameProps.n; j++) {
          row.push(0);
        }
        this.board.push(row);
      }
      return this.board;
    } else {
      return this.board;
    }
  }

  checkPoints() {
    if (!this.board) return;
    //   poz
    for (let i1 = 0; i1 < this.board.length; i1++) {
      const row = this.board[i1];
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < row.length; i++) {
        if (row[i] == 0) {
          temp.inRow = 0;
          continue;
        }
        // alert(JSON.stringify(temp))
        if (row[i] == temp.player) temp.inRow++;
        else temp.inRow = 1;
        temp.player = row[i];
        if (temp.inRow == 5 && temp.player < 3) {
          if (temp.player == 1) this.points.o++;
          if (temp.player == 2) this.points.x++;
          for (let j = i - 4; j <= i; j++) {
            this.board[i1][j] += 2;
          }
        }
      }
    }

    //   pion
    for (let i1 = 0; i1 < this.board[0].length; i1++) {
      const column = [];
      for (let i = 0; i < this.board.length; i++) {
        column.push(this.board[i][i1]);
      }
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < column.length; i++) {
        if (column[i] == 0) {
          temp.inRow = 0;
          continue;
        }
        if (column[i] == temp.player) temp.inRow++;
        else temp.inRow = 1;
        temp.player = column[i];
        if (temp.inRow == 5 && temp.player < 3) {
          if (temp.player == 1) this.points.o++;
          if (temp.player == 2) this.points.x++;
          for (let j = i - 4; j <= i; j++) {
            this.board[j][i1] += 2;
          }
        }
      }
    }

    // skos w prawo
    for (let i1 = -1 * this.board.length; i1 < this.board[0].length; i1++) {
      const skos = [];
      for (let i = 0; i < this.board[0].length; i++) {
        if (this.board[i] && this.board[i][i1 + i])
          skos.push(this.board[i][i1 + i]);
        else skos.push(0);
      }
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < skos.length; i++) {
        if (skos[i] == 0) {
          temp.inRow = 0;
          continue;
        }
        if (skos[i] == temp.player) temp.inRow++;
        else temp.inRow = 1;
        temp.player = skos[i];
        if (temp.inRow == 5 && temp.player < 3) {
          if (temp.player == 1) this.points.o++;
          if (temp.player == 2) this.points.x++;
          for (let j = i - 4; j <= i; j++) {
            this.board[j][i1 + j] += 2;
          }
        }
      }
    }
    // skos w lewo
    for (let i1 = 0; i1 < this.board[0].length + this.board.length; i1++) {
      const skos = [];
      for (let i = 0; i < this.board[0].length; i++) {
        if (this.board[i] && this.board[i][i1 - i])
          skos.push(this.board[i][i1 - i]);
        else skos.push(0);
      }
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < skos.length; i++) {
        if (skos[i] == 0) {
          temp.inRow = 0;
          continue;
        }
        if (skos[i] == temp.player) temp.inRow++;
        else temp.inRow = 1;
        temp.player = skos[i];
        if (temp.inRow == 5 && temp.player < 3) {
          if (temp.player == 1) this.points.o++;
          if (temp.player == 2) this.points.x++;
          for (let j = i - 4; j <= i; j++) {
            this.board[j][i1 - j] += 2;
          }
        }
      }
    }
    let left = 0;
    for (let boardElement of this.board)
      for (let i = 0; i < boardElement.length; i++)
        if (boardElement[i] == 0) left++;

    if (this.gameProps.p == 0) return;
    if (this.points.o == this.gameProps.p) {
      this.end.emit({
        message: `Gracz O wygrał ${this.points.o} do ${this.points.x}`,
      });
    } else if (this.points.x == this.gameProps.p) {
      this.end.emit({
        message: `Gracz X wygrał ${this.points.x} do ${this.points.o}`,
      });
    } else if (left == 0) {
      this.gameIsFinished = true;
      if (this.points.x < this.points.o) {
        console.log('O. zostalo ' + left);
        this.end.emit({
          message: `Koniec pól. Gracz O wygrał ${this.points.o} do ${this.points.x}`,
        });
      } else if (this.points.x > this.points.o) {
        console.log('X. zostalo ' + left);
        this.end.emit({
          message: `Koniec pól. Gracz X wygrał ${this.points.x} do ${this.points.o}`,
        });
      } else {
        console.log('zostalo ' + left);
        this.end.emit({
          message: `Remis ${this.points.o} do ${this.points.x}`,
        });
      }
    }
  }

  ai() {
    let a: { moc: number; player: number; pole: { m: number; n: number } }[] =
      [];
    if (!this.board) return;
    //   poz
    for (let i1 = 0; i1 < this.board.length; i1++) {
      const row = JSON.parse(JSON.stringify(this.board[i1]));
      row.push(0);
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < row.length; i++) {
        if (row[i] == temp.player) temp.inRow++;
        else {
          if (temp.player == 1 || temp.player == 2) {
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i1, n: i },
            });
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i1, n: i - temp.inRow - 1 },
            });
          }
          temp.inRow = 1;
        }
        temp.player = row[i];
      }
    }

    //   pion
    for (let i1 = 0; i1 < this.board[0].length; i1++) {
      const column = [];
      for (let i = 0; i < this.board.length; i++) {
        column.push(this.board[i][i1]);
      }
      column.push(0);
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < column.length; i++) {
        if (column[i] == temp.player) temp.inRow++;
        else {
          if (temp.player == 1 || temp.player == 2) {
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i, n: i1 },
            });
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i - temp.inRow - 1, n: i1 },
            });
          }
          temp.inRow = 1;
        }

        temp.player = column[i];
      }
    }

    // skos w prawo
    for (let i1 = -1 * this.board.length; i1 < this.board[0].length; i1++) {
      const skos = [];
      for (let i = 0; i < this.board[0].length; i++) {
        if (this.board[i] && this.board[i][i1 + i])
          skos.push(this.board[i][i1 + i]);
        else skos.push(0);
      }
      skos.push(0);
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < skos.length; i++) {
        if (skos[i] == temp.player) temp.inRow++;
        else {
          if (temp.player == 1 || temp.player == 2) {
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i, n: i1 + i },
            });
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i - temp.inRow - 1, n: i1 + i - temp.inRow - 1 },
            });
          }
          temp.inRow = 1;
        }
        temp.player = skos[i];
      }
    }
    // skos w lewo
    for (let i1 = 0; i1 < this.board[0].length + this.board.length; i1++) {
      const skos = [];
      for (let i = 0; i < this.board[0].length; i++) {
        if (this.board[i] && this.board[i][i1 - i])
          skos.push(this.board[i][i1 - i]);
        else skos.push(0);
      }
      skos.push(0);
      const temp = { player: 0, inRow: 0 };
      for (let i = 0; i < skos.length; i++) {
        if (skos[i] == temp.player) temp.inRow++;
        else {
          if (temp.player == 1 || temp.player == 2) {
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i, n: i1 - i },
            });
            a.push({
              moc: temp.inRow,
              player: temp.player,
              pole: { m: i - temp.inRow - 1, n: i1 - i + temp.inRow + 1 },
            });
          }
          temp.inRow = 1;
        }
        temp.player = skos[i];
      }
    }

    const q = Math.random() * 2 > 1 ? 1 : 0;
    const moves: { m: number; n: number }[] = a
      .filter((e) => !(e.player == 1 && e.moc <= 1 + q))
      .sort((c, b) => (c.moc < b.moc ? 1 : -1))
      .map((e) => e.pole);

    this.logs.push(JSON.stringify(moves));
    let moved = false;
    for (let move of moves) {
      if (
        this.board[move.m] &&
        this.board[move.m][move.n] !== undefined &&
        this.board[move.m][move.n] == 0
      ) {
        this.logs.push(JSON.stringify([move.m, move.n]));
        this.board[move.m][move.n] = 2;
        moved = true;
        break;
      }
    }

    if (!moved) {
      console.log('a');
      let m = Math.floor(Math.random() * this.gameProps.m);
      let n = Math.floor(Math.random() * this.gameProps.n);
      while (this.board[m][n] !== 0) {
        m = Math.floor(Math.random() * this.gameProps.m);
        n = Math.floor(Math.random() * this.gameProps.n);
      }
      this.board[m][n] = 2;
    }
  }
}
