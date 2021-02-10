import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.scss']
})
export class MatcherComponent implements OnInit {

  heroes!: Hero[];
  selectedHero!: Hero;
  enemyHero: Hero[] = [];

  @Input()
  numbersOfMatches!: number;

  @Output()
  heroSelected: EventEmitter<Hero> = new EventEmitter();
  @Output()
  enemySelected: EventEmitter<Hero[]> = new EventEmitter();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getSelectedHero(): Hero {
    return this.selectedHero;
  }

  getHeroes() {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  findEnemy(): void {
    let matches = this.numbersOfMatches;
    let enemiesList = this.heroes.filter(hero => hero.name !== this.selectedHero.name);
    while(matches > 0) {
      let enemy = enemiesList[Math.floor(Math.random()*enemiesList.length)]
      this.enemyHero.push(enemy);
      enemiesList = enemiesList.filter(hero => hero.name !== enemy.name);
      matches--;
    }
    this.enemySelected.next(this.enemyHero);
  }

  onSelectedHeroChanged(event: any) {
    this.selectedHero = event.value;
    this.heroSelected.next(event.value);
  }

}
