import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChampionComponent } from './liste-champion.component';

describe('ListeChampionComponent', () => {
  let component: ListeChampionComponent;
  let fixture: ComponentFixture<ListeChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
