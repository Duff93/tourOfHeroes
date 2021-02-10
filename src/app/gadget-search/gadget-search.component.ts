import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Gadget } from '../gadget';
import { GadgetService } from '../gadget.service';

@Component({
  selector: 'app-gadget-search',
  templateUrl: './gadget-search.component.html',
  styleUrls: [ './gadget-search.component.scss' ]
})
export class GadgetSearchComponent implements OnInit {
  gadgets$!: Observable<Gadget[]>;
  private searchTerms = new Subject<string>();
  selectedGadget!: Gadget;
  gadgets: Gadget[] = [];

  @Output()
  gadgetAdded: EventEmitter<Gadget> = new EventEmitter();

  constructor(private gadgetService: GadgetService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  onGadgetClicked(gadget: Gadget) {
    this.gadgetAdded.next(gadget);
  }

  clearDropdown() :void {
    this.selectedGadget = {} as Gadget;
  }

  ngOnInit(): void {
    this.gadgets$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.gadgetService.searchGadgets(term)),
    );

    this.gadgetService.getGadgets().subscribe(gadgets => this.gadgets = gadgets);
  }
}