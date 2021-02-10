import { Component, Input, OnInit } from '@angular/core';
import { Gadget } from '../gadget';
import { Hero } from '../hero';
import {FightService} from '../fight.service';
import { Battle } from '../battle';
import {MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-fight-detail',
  templateUrl: './fight-detail.component.html',
  styleUrls: ['./fight-detail.component.scss'],
  providers: [MessageService]
})
export class FightDetailComponent implements OnInit {

  checked: boolean = false;
  attackTotHero: number = 0;
  attackTotEnemy: number = 0;
  currentEnemy!: Hero;
  endProcessingBattles: boolean = false;
  battles!: Battle;

  @Input()
  numbersOfMatches!: number;

  @Input()
  selectedHero!: Hero;
  @Input()
  enemyHero!: Hero[];

  constructor(private fightService: FightService, private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  setCurrentEnemy() {
  }

  calculateAttack(gadgets: Gadget[]): number {
    let attackTotTemp = 0;
    if(gadgets) gadgets.forEach(item => attackTotTemp += item.bonus);
    return attackTotTemp;
  }

  CalculateAttacksTot() {
    this.currentEnemy = this.enemyHero[0];
    if(this.attackTotHero != 0) this.attackTotHero = 0;
    if(this.attackTotEnemy != 0) this.attackTotEnemy = 0;
    this.attackTotHero = this.calculateAttack(this.selectedHero.gadgets) + this.selectedHero.attack;
    this.attackTotEnemy = this.calculateAttack(this.currentEnemy.gadgets) + this.currentEnemy.attack;
  }

  fight() {
    this.CalculateAttacksTot();
    let currentBattle = <Battle>{};
    currentBattle.selectedHero = this.selectedHero;
    currentBattle.enemyHero = this.enemyHero;
    this.fightService.getWinner(currentBattle)
      .subscribe(battle => {this.endProcessingBattles = true; this.battles = battle});
  }

  startSingleFight() {
    let battleResultLog = this.battles.battleLog[0];
    this.battles.battleLog.splice(0,1);
    this.showBattleLog(battleResultLog);
    if(this.checked) this.enemyHero.splice(0,1);
    this.CalculateAttacksTot();
    if(!this.checked) this.checked = true;
  }

  showBattleLog(battleLog: string) {
    if(battleLog == "hero") {
      setTimeout(() => {this.messageService.add({severity:'success', summary:'Hero win!'})}, 300);
    }
    else {
      setTimeout(() => {this.messageService.add({severity:'error', summary:'Enemy win!'})}, 300);
      this.endProcessingBattles = false;
    }
  }

  onReject() {
    this.messageService.clear("c");
  }
}
