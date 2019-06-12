import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <h1 class="titteli">
        Ristinolla
      </h1>
      <app-board-component></app-board-component>
  `,
  styles: [
    `"src/styles.css"`,
    `.titteli{
  text-align: center;
}`
  ]
})

export class AppComponent {

}

@Component({
  selector: 'app-board-component',
  template: `
  <div class="board">
  <div class="row"  *ngFor="let row of [0,1,2]">
    <app-square-component class="container" *ngFor="let col of [0,1,2]"
    [state]="squares[col+row*3]"
    (click)="makeMove(col+row*3)"></app-square-component>
  </div>
  </div>
  <div class="row" id="buttons">
    <div class="status">{{status}}</div>
    <button (click)="newGame()">Uusi Peli</button>
  </div>

  `,
  styles: [
    `.row { clear: both;
    }
    `,
    ` #buttons {
  text-align: center;
}

`,
    `.board {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 40%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%)
 }`
  ]
})

export class BoardComponent {
  squares = Array(9).fill(null);
  player = 'X';
  winner = null;

  get status() {
    return this.winner ? `Winner: ${this.winner}` : `Player: ${this.player}`;
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
  }

  makeMove(position) {
    if (!this.winner && !this.squares[position]) {
      this.squares[position] = this.player;
      if (this.winningMove()) {
        this.winner = this.player;
      }
      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  winningMove(): boolean {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const line of lines) {
      if (this.squares[line[0]] && this.squares[line[0]] === this.squares[line[1]]
        && this.squares[line[1]] === this.squares[line[2]]) {
        return true;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-square-component',
  template: `{{state}}`,
  styles: [`
  :host {
    width: 50px;
    height: 50px;
    border: solid 1px black;
    float:left;
    font-size: 40px;
    text-align: center;
  }`]
})
export class SquareComponent {
  @Input() state;
}

