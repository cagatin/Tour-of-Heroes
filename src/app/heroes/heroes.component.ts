import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';    // imports our Hero Service

@Component({
  selector: 'app-heroes',  // will be invoked using <app-heroes> 
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  // Here, we define the click event that occurs on the HeroesComponent
  // When a hero is clicked, the selected hero is bound to the selectedHero method
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // we add the heroService to the constructor to define a rpivate heroService property
  // When angular creates a HeroComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService
  constructor(private heroService: HeroService) { }

  // lifecycle hook.
  // Angular calls ngOnInit() after creating a component. 
  ngOnInit(): void {
  }

}
