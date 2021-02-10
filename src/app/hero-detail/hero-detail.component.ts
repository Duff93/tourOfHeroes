import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { GadgetService } from '../gadget.service';
import { Gadget } from '../gadget';
import { forkJoin } from 'rxjs';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  gadgets: Gadget[] = [];
  attackTot: number = 0;
  valueOfAttack = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private gadgetService: GadgetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == undefined) throw new Error(); 
    this.heroService.getHero(id)
      .subscribe(hero => this.getHeroWithGadgets(hero));
  }

  getHeroWithGadgets(hero: Hero): void {
    this.hero = hero;
    /*for(var i of this.hero.listOfGadgetsId) { 
      this.gadgetService.getGadget(i)
      .subscribe(gadget => this.gadgets.push(gadget));
    }*/
    if(this.hero.gadgets.length == 0) {
      this.attackTot = 0;
      this.attackTot += this.hero.attack;
      this.updateAttack(this.hero);
      this.gadgets = [];
      return;
    }
    const observables = this.hero.gadgets.map(gadget => this.gadgetService.getGadget(gadget));
    forkJoin(observables).subscribe(gadgets => {this.calculateAttack(gadgets); this.updateAttack(this.hero)});
  }

  calculateAttack(gadgets: Gadget[]): void {
    this.gadgets = gadgets;
    this.attackTot = 0;
    this.gadgets.forEach(item => this.attackTot += item.bonus);
    this.attackTot += this.hero.attack;
  }

  goBack(): void {
    this.location.back();
  }

  updateAttack(hero: Hero): void {
    this.valueOfAttack.setValue(hero.attack);
  }

  save(): void {
    this.hero.attack = +this.valueOfAttack.value;
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.getHeroWithGadgets(this.hero));
  }

  addGadgets(gadget: Gadget): void {
    if (!gadget) { return; }
    if(!this.hero.gadgets) {
      this.hero.gadgets = [];
    }
    this.hero.gadgets.push(gadget);
    this.heroService.updateHero(this.hero).subscribe(() => this.getHeroWithGadgets(this.hero));
  }

  delete(gadgetToDelete: Gadget): void {
    this.hero.gadgets = this.hero.gadgets.filter(gadget => gadget.id !== gadgetToDelete.id);
    this.heroService.updateHero(this.hero).subscribe(() => this.getHeroWithGadgets(this.hero));
  }
}