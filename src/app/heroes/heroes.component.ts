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

  /* Here, we define the click event that occurs on the HeroesComponent
   * When a hero is clicked, the selected hero is bound to the selectedHero method
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // getter method to retrieve heroes from the HeroService
  getHeroes(): void {
    // this.heroService.getHeroes() --> returns Observable<Hero[]>
    // Observable<Hero[]>.subscribe(heroes => this.heroes = heroes) --> passes the emitted heroes to the callback, which sets the component's heroes property. 
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  /* we add the heroService to the constructor to define a private heroService property
   * this identifies it as a HeroService injection site.
   * When angular creates a HeroComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService
   */
  constructor(private heroService: HeroService) { }

  // lifecycle hook.
  // Angular calls ngOnInit() after creating a component. 
  ngOnInit(): void {
    this.getHeroes();   // populate the Heroes array.
  }

}
