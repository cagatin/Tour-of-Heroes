import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';        // imports our Hero Service
import { MessageService } from '../message.service';  // imports Message Service

@Component({
  selector: 'app-heroes',  // will be invoked using <app-heroes> 
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  // getter method to retrieve heroes from the HeroService
  getHeroes(): void {
    // this.heroService.getHeroes() --> returns Observable<Hero[]>
    // Observable<Hero[]>.subscribe(heroes => this.heroes = heroes) --> passes the emitted heroes to the callback, which sets the component's heroes property. 
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  // set method which adds a new hero
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }

  /* we add the heroService and messageService to the constructor to define a private heroService property
   * this identifies it as a HeroService/MessageService injection site.
   * When angular creates a HeroComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService
   */
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  // lifecycle hook.
  // Angular calls ngOnInit() after creating a component. 
  ngOnInit(): void {
    this.getHeroes();   // populate the Heroes array.
  }

}
