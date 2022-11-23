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
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // getter which returns an array of heroes
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        // catchError() will intercept a failed Observable and pass the error to our handleError error handling funciton.
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // GET method which retrieves a specific Hero based on some ID - GET
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;              // constructs a request URL w/ the desired hero's ID
    return this.http.get<Hero>(url).pipe(               // server responds with a single hero based on ID
      tap(_ => this.log(`fetched hero=${id}`)),         // .pipe() transforms data for display
      catchError(this.handleError<Hero>(`getHero id]${id}`))
    )
  }

  // UPDATE method which updates a Hero's name - PUT
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(
      this.heroesUrl,       // URL of hero
      hero,                 // data to update (modified hero)
      this.httpOptions      // Options
    ).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updatedHero'))
    );
  }

  // ADD a new Hero - POST
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(
      this.heroesUrl,
      hero,
      this.httpOptions
    ).pipe(
      tap((newHero: Hero) => this.log(`Added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // DELETE hero - DELETE
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(
      url,
      this.httpOptions
    ).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deletedHero'))
    );
  }

  // Search for a Hero
  searchHeroes(term: string): Observable<Hero[]> {
    // if the search term is empty, return an empty hero array
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes found matching "${term}`),
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
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
