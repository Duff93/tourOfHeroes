import { Gadget } from './gadget';

export interface Hero {
  id: string;
  name: string;
  attack: number;
  health: number;
  gadgets: Gadget[];
  img: string;
  win: number;
  lost: number;
}