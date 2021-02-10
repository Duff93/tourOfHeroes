import { Injectable } from '@angular/core';
import {Message,MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageCustomService {
  messages: string[] = [];
  msgs1!: Message[];

  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
  }

  add(message: string) {
    this.msgs1 = [{severity:'info', summary:'Info', detail:'Message Content'}];
  }

  clear() {
    this.messages = [];
  }
}
