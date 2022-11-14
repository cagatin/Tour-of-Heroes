import { Component } from '@angular/core';

@Component({
  // CSS Selector that defines how the component is used in a template.
  selector: 'app-root',

  // HTML template that instructs Angular on how to render the component. 
  templateUrl: './app.component.html',

  // Optional set of CSS styles
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
}
