import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';             // importing routing capability
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

/* Here, we specify the routes within the Routes[] array.
 * The Routes[] array tells the Router which view to display when a user clicks a link or pastes a URL into the address bar.
 * Syntax:
 * {path: 'string that matches URL of the path', component: <component that the router should create when navigating to the route>}
 */
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },    // here, we add a default route that points to website's route. 
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }        // go to specific hero detail page
];

// Metadata that initializes the router and starts it listening for browser location changes
@NgModule({
  // adds the RouterModule to the AppRoutingModule imports array and configures RouterModule w/ the routes by calling .forRoot() method.
  imports: [RouterModule.forRoot(routes)],

  // Exports the RouterModule to be available throughout the application.
  exports: [RouterModule]
})

export class AppRoutingModule { }
