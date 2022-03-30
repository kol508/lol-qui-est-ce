import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChampionComponent } from './form-champion.component';

describe('FormChampionComponent', () => {
  let component: FormChampionComponent;
  let fixture: ComponentFixture<FormChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
