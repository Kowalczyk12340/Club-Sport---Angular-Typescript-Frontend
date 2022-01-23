import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clubLeaguesCreationDto, clubLeaguesDto } from '../club-leagues.model';
import { ClubLeagueService } from '../club-leagues.service';

@Component({
  selector: 'app-edit-club-league',
  templateUrl: './edit-club-league.component.html',
  styleUrls: ['./edit-club-league.component.css'],
})
export class EditClubLeagueComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private clubLeagueService: ClubLeagueService,
    private router: Router
  ) {}

  model: clubLeaguesDto;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.clubLeagueService
        .getById(params.id)
        .subscribe((clubLeague) => (this.model = clubLeague));
    });
  }

  saveChanges(clubLeague: clubLeaguesCreationDto) {
    this.clubLeagueService
      .edit(this.model.id, clubLeague)
      .subscribe(() => this.router.navigate(['/clubleagues']));
  }
}
