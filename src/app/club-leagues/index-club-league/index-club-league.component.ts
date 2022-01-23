import { Component, OnInit } from '@angular/core';
import { ClubLeagueService } from '../club-leagues.service';

@Component({
  selector: 'app-index-club-league',
  templateUrl: './index-club-league.component.html',
  styleUrls: ['./index-club-league.component.css'],
})
export class IndexClubLeagueComponent implements OnInit {
  constructor(private clubLeagueService: ClubLeagueService) {}

  clubLeagues;
  displayColumns = ['name', 'actions'];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.clubLeagueService
      .get()
      .subscribe((clubLeagues) => (this.clubLeagues = clubLeagues));
  }

  delete(id: number) {
    this.clubLeagueService.delete(id).subscribe(() => this.loadData());
  }
}
