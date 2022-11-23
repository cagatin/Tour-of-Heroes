import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // the Input() property is what enables data to be shared between parent-child components
  @Input() hero?: Hero;

  // Here, we injected ActivatedRoute, HeroService, and Location services into the constructor
  constructor(
    private route: ActivatedRoute,        // holds information about the route tot his instance of HeroDetailComponent
    private heroService: HeroService,     // gets hero date from the remote server
    private location: Location            // angular service for interacting w the browser.
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // paramMap --> dictionary of route parameter values extracted from the URL.
    const id = Number(this.route.snapshot.paramMap.get('id'));          // retrieve the route paramter id

    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(
        () => this.goBack()
      )
    }
  }

}
