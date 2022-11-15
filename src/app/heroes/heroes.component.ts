import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',  // will be invoked using <app-heroes> 
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero?: Hero;

  // Here, we define the click event that occurs on the HeroesComponent
  // When a hero is clicked, the selected hero is bound to the selectedHero method
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  // lifecycle hook.
  // Angular calls ngOnInit() after creating a component. 
  ngOnInit(): void {
  }

}
