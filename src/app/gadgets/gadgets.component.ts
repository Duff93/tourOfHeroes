import { Component, OnInit } from '@angular/core';
import { Gadget } from '../gadget';
import { GadgetService } from '../gadget.service';

@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.scss']
})
export class GadgetsComponent implements OnInit {

  gadgets!: Gadget[];

  selectedGadget!: Gadget;

  constructor(private gadgetService: GadgetService) { }

  ngOnInit(): void {
    this.getGadgets();
  }

  getGadgets(): void {
    this.gadgetService.getGadgets()
    .subscribe(gadgets => this.gadgets = gadgets);
  }

  onSelect(gadget: Gadget): void {
    this.selectedGadget = gadget;
  }

  delete(gadget: Gadget): void {
    this.gadgets = this.gadgets.filter(g => g !== gadget);
    this.gadgetService.deleteGadget(gadget).subscribe();
  }

  add(name: string, bonus: string): void {
    name = name.trim();
    if (!name) { return; }
    this.gadgetService.addGadget({ name, bonus } as unknown as Gadget)
      .subscribe(gadget => {
        gadget.bonus = +bonus;
        this.gadgets.push(gadget)
      });
  }

}
