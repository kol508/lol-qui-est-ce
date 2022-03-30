import {Component, Input, OnInit} from '@angular/core';
import { ChampionService } from 'src/services/champion.service';
import {Champion} from "../../entity/champion";

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {

  constructor(private championService:ChampionService) { }

  ngOnInit(): void {
    //no problem
    }

  @Input() champion:Champion = {name:"",imgUrl:""}
  @Input() isPlayerChampion: boolean = false;

  deleteChampion(){
    if (!this.isPlayerChampion) {
      this.championService.deleteChampion(this.champion);
    }
  }

}
