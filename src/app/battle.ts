import { Hero } from './hero';

export interface Battle {
    selectedHero: Hero;
    enemyHero: Hero[];
    battleLog: string[];
}