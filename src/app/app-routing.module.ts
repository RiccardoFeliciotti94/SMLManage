import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'competition', loadChildren: './competition/competition.module#CompetitionPageModule' },
  { path: 'update-matches', loadChildren: './update-matches/update-matches.module#UpdateMatchesPageModule' },
  { path: 'create-bid', loadChildren: './create-bid/create-bid.module#CreateBidPageModule' },
  { path: 'add-players', loadChildren: './add-players/add-players.module#AddPlayersPageModule' },
  { path: 'add-bidders', loadChildren: './add-bidders/add-bidders.module#AddBiddersPageModule' },
  { path: 'insert-bidders', loadChildren: './insert-bidders/insert-bidders.module#InsertBiddersPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
