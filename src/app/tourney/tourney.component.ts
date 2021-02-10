import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-tourney',
  templateUrl: './tourney.component.html',
  styleUrls: ['./tourney.component.scss']
})
export class TourneyComponent implements OnInit {

  numbersOfMatches!: number;
  selectedHero!: Hero;
  enemyHero!: Hero[];
  winner!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeHero(hero: Hero) {
    this.selectedHero = hero;
  }

  onBlurEnemy(enemies: Hero[]) {
    this.enemyHero = enemies;
  }

}
