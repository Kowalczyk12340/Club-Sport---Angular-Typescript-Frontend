import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../clubs/clubs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private clubsService: ClubsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  clubsInLeagues;
  clubsFutureReleases;

  loadData() {
    this.clubsService.getHomePageClubs().subscribe((homeDto) => {
      this.clubsFutureReleases = homeDto.upcomingReleases;
      this.clubsInLeagues = homeDto.hasOwnStadium;
    });
  }

  onDelete() {
    this.loadData();
  }
}
