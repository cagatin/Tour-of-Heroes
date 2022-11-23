import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// the @Injectable decorator marks the class as one that participates in the dependency injection system.
// when the service is provided at the root level, Angular creates a single, shared instance of HeroService and injects it into any class
// that asks for it.
@Injectable({
  providedIn: 'root'    // root injecter for our service
})

// This HeroService class provides an injectable service
// Services allow us to define code/functionalities that are accessible/reusable in many other components in our project.
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  // getter which returns an array of heroes
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        // catchError() will intercept a failed Observable and pass the error to our handleError error handling funciton.
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // getter which returns a specified hero id
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  /* service-in-service scenerio.
   * Here, we inject the MessageService into HeroService, 
   * which is then injected into HeroesComponent.
   */
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }
}
