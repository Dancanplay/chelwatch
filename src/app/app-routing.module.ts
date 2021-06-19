import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatchesComponent} from './matches/matches.component';
import {PlayerComponent} from './player/player.component';

const routes: Routes = [
  {path: 'matches/:date', component: MatchesComponent},
  {path: 'stream', component: PlayerComponent},
  {path: '**', redirectTo: 'matches/' }
  ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
