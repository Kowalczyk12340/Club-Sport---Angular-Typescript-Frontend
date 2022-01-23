import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clubLeaguesCreationDto } from '../club-leagues.model';
import { ClubLeagueService } from '../club-leagues.service';

@Component({
  selector: 'app-create-club-league',
  templateUrl: './create-club-league.component.html',
  styleUrls: ['./create-club-league.component.css'],
})
export class CreateClubLeagueComponent implements OnInit {
  constructor(
    private clubLeagueService: ClubLeagueService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveChanges(clubLeague: clubLeaguesCreationDto) {
    console.log(clubLeague);
    this.clubLeagueService
      .create(clubLeague)
      .subscribe(() => this.router.navigate(['/clubleagues']));
  }
}
