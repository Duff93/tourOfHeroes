import { Component, OnInit } from '@angular/core';
import { MessageCustomService } from '../message-custom.service';
import {Message,MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MessageCustomService]
})
export class MessagesComponent implements OnInit {

  msgs1!: Message[];

  constructor(public messageService: MessageCustomService) {}

  ngOnInit() {
  }

}