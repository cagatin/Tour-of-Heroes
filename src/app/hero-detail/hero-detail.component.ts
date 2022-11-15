import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // the Input() property is what enables data to be shared between parent-child components
  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
