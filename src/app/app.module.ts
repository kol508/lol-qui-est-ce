import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListeChampionComponent } from './liste-champion/liste-champion.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ChampionComponent } from './champion/champion.component';
import { FormChampionComponent } from './form-champion/form-champion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ListeChampionComponent,
    ChampionComponent,
    FormChampionComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
