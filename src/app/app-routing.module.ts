import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlayerComponent } from './players/create-player/create-player.component';
import { CreateCoachComponent } from './coaches/create-coach/create-coach.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';
import { IndexPlayersComponent } from './players/index-player/index-player.component';
import { IndexCoachesComponent } from './coaches/index-coach/index-coach.component';
import { CreateNationalityComponent } from './nationalities/create-nationality/create-nationality.component';
import { EditNationalityComponent } from './nationalities/edit-nationality/edit-nationality.component';
import { IndexNationalitiesComponent } from './nationalities/index-nationality/index-nationalities.component';
import { HomeComponent } from './home/home.component';
import { IsAdminGuard } from './is-admin.guard';
import { CreateClubLeagueComponent } from './club-leagues/create-club-leagues/create-club-league.component';
import { EditClubLeagueComponent } from './club-leagues/edit-club-league/edit-club-league.component';
import { IndexClubLeagueComponent } from './club-leagues/index-club-league/index-club-league.component';
import { CreateClubComponent } from './clubs/create-club/create-club.component';
import { EditClubComponent } from './clubs/edit-club/edit-club.component';
import { ClubDetailsComponent } from './clubs/club-details/club-details.component';
import { ClubFilterComponent } from './clubs/club-filter/club-filter.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { UsersIndexComponent } from './security/users-index/users-index.component';
import { EditCoachComponent } from './coaches/edit-coach/edit-coach.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'nationalities',
    component: IndexNationalitiesComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'nationalities/create',
    component: CreateNationalityComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'nationalities/edit/:id',
    component: EditNationalityComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'players',
    component: IndexPlayersComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'players/create',
    component: CreatePlayerComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'players/edit/:id',
    component: EditPlayerComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'coaches',
    component: IndexCoachesComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'coaches/create',
    component: CreateCoachComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'coaches/edit/:id',
    component: EditCoachComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'clubleagues',
    component: IndexClubLeagueComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'clubleagues/create',
    component: CreateClubLeagueComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'clubleagues/edit/:id',
    component: EditClubLeagueComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'clubs/create',
    component: CreateClubComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'clubs/edit/:id',
    component: EditClubComponent,
    canActivate: [IsAdminGuard],
  },
  { path: 'clubs/filter', component: ClubFilterComponent },
  { path: 'club/:id', component: ClubDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'users',
    component: UsersIndexComponent,
    canActivate: [IsAdminGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
