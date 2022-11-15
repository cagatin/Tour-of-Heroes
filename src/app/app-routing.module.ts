import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';             // importing routing capability
import { HeroesComponent } from './heroes/heroes.component';

// Here, we specify the routes within the Routes[] array.
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
