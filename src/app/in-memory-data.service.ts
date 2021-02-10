import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Gadget } from './gadget';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', attack: 3, health: 4, listOfGadgetsId: [1,2] },
      { id: 12, name: 'Narco', attack: 6, health: 5 },
      { id: 13, name: 'Bombasto', attack: 7, health: 3 },
      { id: 14, name: 'Celeritas', attack: 1, health: 2 },
      { id: 15, name: 'Magneta', attack: 4, health: 4 },
      { id: 16, name: 'RubberMan', attack: 2, health: 4 },
      { id: 17, name: 'Dynama', attack: 8, health: 2 },
      { id: 18, name: 'Dr IQ', attack: 6, health: 9 },
      { id: 19, name: 'Magma', attack: 5, health: 5 },
      { id: 20, name: 'Tornado', attack: 2, health: 9 }
    ];
    const gadgets = [
      { id: 1, name: 'Gadget1', bonus: 6 },
      { id: 2, name: 'Gadget2', bonus: 3 },
      { id: 3, name: 'Gadget3', bonus: 5 },
      { id: 4, name: 'Gadget4', bonus: 4 },
      { id: 5, name: 'Gadget5', bonus: 2 },
      { id: 6, name: 'Gadget6', bonus: 7 },
      { id: 7, name: 'Gadget7', bonus: 8 },
      { id: 8, name: 'Gadget8', bonus: 9 },
      { id: 9, name: 'Gadget9', bonus: 9 },
      { id: 10, name: 'Gadget10', bonus: 10 }
    ];
    return {heroes, gadgets};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genIdHeroes(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

  genIdGadgets(gadgets: Gadget[]): number {
    return gadgets.length > 0 ? Math.max(...gadgets.map(gadget => gadget.id)) + 1 : 11;
  }
}