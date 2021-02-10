import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import { GadgetsComponent } from './gadgets/gadgets.component';
import { GadgetSearchComponent } from './gadget-search/gadget-search.component';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule, } from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SplitterModule} from 'primeng/splitter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import { TourneyComponent } from './tourney/tourney.component';
import { MatcherComponent } from './matcher/matcher.component';
import { FightDetailComponent } from './fight-detail/fight-detail.component';
import {ToastModule} from 'primeng/toast';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    InputTextModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    TabMenuModule,
    CardModule,
    DropdownModule,
    SplitterModule,
    InputSwitchModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    ToastModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    GadgetsComponent,
    GadgetSearchComponent,
    TourneyComponent,
    MatcherComponent,
    FightDetailComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  providers: [MessageService, authInterceptorProviders],
  bootstrap: [ AppComponent ]
})
export class AppModule { }