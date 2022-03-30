import {Component, OnInit} from '@angular/core';
import {Champion} from "../../entity/champion";
import {ChampionService} from "../../services/champion.service";

@Component({
  selector: 'app-liste-champion',
  templateUrl: './liste-champion.component.html',
  styleUrls: ['./liste-champion.component.css']
})
export class ListeChampionComponent implements OnInit {
  championsDeleted: Champion[] = [];
  champions: Champion[] = [];
  playerChampion: Champion = {
    imgUrl: '',
    name: '',
  };
  total: number = 0;
  actual: number = 0;
  championTags = this.championService.championTags;
  isShowDeletedChampion: boolean = false;

  constructor(private championService: ChampionService) {
  }

  ngOnInit(): void {
    this.championService.getActualChampions().subscribe(champions => {
      this.champions = champions;
      this.actual = this.championService.getLengthActualChampions();
      this.total = this.championService.getLengthChampionsNormal();
    });

    this.championService.getDeletedChampions().subscribe(champions => {
      this.championsDeleted = champions;
    })

    this.championService.getPlayerChampion().subscribe(champion => {
      this.playerChampion = champion;
    })
  }

  resetChampions(): void {
    this.championService.resetActualChampions()
  }

  deleteChampionsByType(tag: string): void {
    this.championService.deleteByType(tag);
  }

  showDeletedChampion() {
    this.isShowDeletedChampion = !this.isShowDeletedChampion;
  }
}
