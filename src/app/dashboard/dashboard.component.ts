import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  // heroes array property which stores top heroes.
  heroes: Hero[] = [];

  // constructor expects Angular to inject the HeroService into a private heroService instance.
  constructor(private heroService: HeroService) { }

  // when this component is initialized, calls getHeroes() method.
  ngOnInit(): void {
    this.getHeroes();
  }

  // retrieves the top 5 heroes from the hero service. 
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
