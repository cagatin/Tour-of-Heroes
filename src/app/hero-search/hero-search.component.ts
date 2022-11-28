import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap,
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})


export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();    // a Suject is a source of observable values and an Observable itself.

  constructor(private heroService: HeroService) { }

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);    // push values into the searchTerm observable
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after ea keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as prev term
      distinctUntilChanged(),
      // switch to a new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
