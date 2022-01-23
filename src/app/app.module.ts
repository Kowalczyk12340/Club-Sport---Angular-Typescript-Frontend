import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClubsListComponent } from './clubs/clubs-list/clubs-list.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import '../football.jpg';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { RatingComponent } from './utilities/rating/rating.component';
import { HomeComponent } from './home/home.component';
import { IndexNationalitiesComponent } from './nationalities/index-nationality/index-nationalities.component';
import { CreateNationalityComponent } from './nationalities/create-nationality/create-nationality.component';
import { IndexPlayersComponent } from './players/index-player/index-player.component';
import { IndexCoachesComponent } from './coaches/index-coach/index-coach.component';
import { CreatePlayerComponent } from './players/create-player/create-player.component';
import { CreateCoachComponent } from './coaches/create-coach/create-coach.component';
import { IndexClubLeagueComponent } from './club-leagues/index-club-league/index-club-league.component';
import { CreateClubLeagueComponent } from './club-leagues/create-club-leagues/create-club-league.component';
import { CreateClubComponent } from './clubs/create-club/create-club.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';
import { EditNationalityComponent } from './nationalities/edit-nationality/edit-nationality.component';
import { EditClubLeagueComponent } from './club-leagues/edit-club-league/edit-club-league.component';
import { EditClubComponent } from './clubs/edit-club/edit-club.component';
import { ClubFilterComponent } from './clubs/club-filter/club-filter.component';
import { FormNationalityComponent } from './nationalities/form-nationality/form-nationality.component';
import { FormPlayerComponent } from './players/form-player/form-player.component';
import { FormCoachComponent } from './coaches/form-coach/form-coach.component';
import { InputImgComponent } from './utilities/input-img/input-img.component';
import { InputMarkdownComponent } from './utilities/input-markdown/input-markdown.component';
import { ClubLeagueFormComponent } from './club-leagues/club-league-form/club-league-form.component';
import { MapComponent } from './utilities/map/map.component';
import { FormClubComponent } from './clubs/form-club/form-club.component';
import { MultipleSelectorComponent } from './utilities/multiple-selector/multiple-selector.component';
import { PlayersAutocompleteComponent } from './players/players-autocomplete/players-autocomplete.component';
import { CoachesAutocompleteComponent } from './coaches/coaches-autocomplete/coaches-autocomplete.component';
import { DisplayErrorsComponent } from './utilities/display-errors/display-errors.component';
import { ClubDetailsComponent } from './clubs/club-details/club-details.component';
import { AuthorizeViewComponent } from './security/authorize-view/authorize-view.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { AuthenticationFormComponent } from './security/authentication-form/authentication-form.component';
import { JwtInterceptorService } from './security/jwt-interceptor.service';
import { UsersIndexComponent } from './security/users-index/users-index.component';
import { EditCoachComponent } from './coaches/edit-coach/edit-coach.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubsListComponent,
    GenericListComponent,
    MenuComponent,
    RatingComponent,
    HomeComponent,
    IndexNationalitiesComponent,
    CreateNationalityComponent,
    IndexPlayersComponent,
    IndexCoachesComponent,
    CreatePlayerComponent,
    CreateCoachComponent,
    IndexClubLeagueComponent,
    CreateClubLeagueComponent,
    CreateClubComponent,
    EditPlayerComponent,
    EditCoachComponent,
    EditNationalityComponent,
    EditClubLeagueComponent,
    EditClubComponent,
    ClubFilterComponent,
    FormNationalityComponent,
    FormPlayerComponent,
    FormCoachComponent,
    InputImgComponent,
    InputMarkdownComponent,
    ClubLeagueFormComponent,
    MapComponent,
    FormClubComponent,
    MultipleSelectorComponent,
    PlayersAutocompleteComponent,
    CoachesAutocompleteComponent,
    DisplayErrorsComponent,
    ClubDetailsComponent,
    AuthorizeViewComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationFormComponent,
    UsersIndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
