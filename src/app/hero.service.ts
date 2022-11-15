import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

// the @Injectable decorator marks the class as one that participates in the dependency injection system.
// when the service is provided at the root level, Angular creates a single, shared instance of HeroService and injects it into any class
// that asks for it.
@Injectable({
  providedIn: 'root'    // root injecter for our service
})

// This HeroService class provides an injectable service
// Services allow us to define code/functionalities that are accessible/reusable in many other components in our project.
export class HeroService {

  // getter which returns an array of heroes
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);    // returns an Observable<Hero[]> that emits a single value (array of mock heroes).
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  constructor(private messageService: MessageService) { }
}
