import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ChampionService} from "../../services/champion.service";
import {Champion} from "../../entity/champion";

@Component({
  selector: 'app-form-champion',
  templateUrl: './form-champion.component.html',
  styleUrls: ['./form-champion.component.css']
})
export class FormChampionComponent implements OnInit {
  private champion: Champion = {
    name:'',
    imgUrl:''
  };

  constructor(private championService: ChampionService) { }

  name = new FormControl('');
  imgUrl = new FormControl('');

  ngOnInit(): void {
    //np
  }

  addChampion() {
    this.champion = {
      name : this.name.value,
      imgUrl: this.imgUrl.value
    }
    this.championService.addChampionInActualChampion(this.champion);
  }
}
