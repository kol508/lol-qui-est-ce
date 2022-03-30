import {Injectable} from '@angular/core';
import {Champion} from "../entity/champion";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private actualChampions: Champion[] = [];
  private normalChampions: Champion[] = [];
  private deletedChampions: Champion[] = [];
  private playerChampion !: Champion;
  private _championTags: string[] = ['Assassin', 'Mage','Fighter', 'Marksman', 'Tank','Support']
  private actualChampionsSubject = new Subject<Champion[]>();
  private deletedChampionsSubject = new Subject<Champion[]>();
  private playerChampionSubject = new Subject<Champion>();

  private URL_BASE: string = 'http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/';
  private URL_API: string = 'https://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion.json';

  constructor(private http: HttpClient) {
    this.initChampionsFromAPI();
  }

  private initChampionsFromAPI() {
    this.callAPI().subscribe((resp: any) => {
      this.transformAPIDataAndFeedingOfNormalChampions(resp)
    });
  }

  private callAPI(): Observable<any> {
    return this.http.get(this.URL_API)
  }

  private transformAPIDataAndFeedingOfNormalChampions(json: object) {
    // @ts-ignore
    let championsFromAPI = json.data;
    let champions = [] as Champion[]
    for (const key in championsFromAPI) {
      let champion = {
        name: championsFromAPI[key].name,
        imgUrl: this.URL_BASE + championsFromAPI[key].image.full,
        tags: championsFromAPI[key].tags
      } as Champion;
      champions.push(champion);
    }
    this.setNormalChampions(champions);
    this.setActualChampions(champions);
    this.setPlayerChampion(this.getRandomChampion());
  }

  private setNormalChampions(champions: Champion[]) {
    this.normalChampions = champions.slice();
  }

  private setActualChampions(champions: Champion[]) {
    this.actualChampions = champions.slice();
    this.actualChampionsSubject.next(this.actualChampions);
  }

  private setPlayerChampion(champion: Champion){
    this.playerChampionSubject.next(champion);
  }

  getRandomChampion() {
    return this.normalChampions[Math.floor(Math.random() * this.normalChampions.length)];
  }

  addChampionInActualChampion(champion: Champion) {
    this.actualChampions.push(champion);
  }

  resetActualChampions() {
    this.actualChampions = this.normalChampions.slice()
    this.deletedChampions = [];
    this.playerChampion = this.getRandomChampion();
    this.actualChampionsSubject.next(this.actualChampions);
    this.deletedChampionsSubject.next(this.deletedChampions);
    this.playerChampionSubject.next(this.playerChampion);
  }

  getActualChampions(): Observable<Champion[]> {
    return this.actualChampionsSubject.asObservable();
  }

  getDeletedChampions(): Observable<Champion[]> {
    return this.deletedChampionsSubject.asObservable();
  }

  deleteByType(tag: string) {
    let championsToDelete = this.triByTag(tag);
    championsToDelete.forEach(champion => {
      this.deleteChampion(champion);
    })
  }

  private triByTag(tag: string): Champion[] {
    let champions = [] as Champion[];
    this.actualChampions.forEach(champion => {
      champion.tags?.forEach(currentTag => {
        if (currentTag === tag) {
          champions.push(champion);
        }
      })
    })
    return champions
  }

  deleteChampion(championToDelete: Champion) {
    let clearChampions = this.actualChampions.filter(champion => championToDelete !== champion);
    this.setActualChampions(clearChampions);
    this.addChampionInDeleted(championToDelete);
  }

  private addChampionInDeleted(champion: Champion) {
    this.deletedChampions.push(champion);
    this.deletedChampionsSubject.next(this.deletedChampions);
  }

  getLengthChampionsNormal() {
    return this.normalChampions.length;
  }

  getLengthActualChampions() {
    return this.actualChampions.length;
  }

  get championTags(): string[] {
    return this._championTags;
  }

  getPlayerChampion(){
    return this.playerChampionSubject.asObservable();
  }
}
