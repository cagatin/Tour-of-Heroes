import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// the @Injectable decorator marks the class as one that participates in the dependency injection system.
// when the service is provided at the root level, Angular creates a single, shared instance of HeroService and injects it into any class
// that asks for it.
@Injectable({
  providedIn: 'root'    // root injecter for our service
})

// This HeroService class provides an injectable service
export class HeroService {

  // getter which returns an array of heroes
  getHeroes(): Hero[] {
    return HEROES;
  }

  constructor() { }
}
