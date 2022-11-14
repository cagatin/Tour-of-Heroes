import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  constructor() { }

  // lifecycle hook.
  // Angular calls ngOnInit() after creating a component. 
  ngOnInit(): void {
  }

  hero = 'Windstorm';

}
