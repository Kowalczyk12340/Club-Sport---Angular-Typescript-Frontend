import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coachesClubDto } from 'src/app/coaches/coaches.model';
import { playersClubDto } from 'src/app/players/players.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { clubCreationDto, clubDto } from '../clubs.model';
import { ClubsService } from '../clubs.service';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css'],
})
export class EditClubComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private clubsService: ClubsService,
    private router: Router
  ) {}

  model: clubDto;

  selectedNationalities: multipleSelectorModel[];
  nonSelectedNationalities: multipleSelectorModel[];
  selectedClubLeagues: multipleSelectorModel[];
  nonSelectedClubLeagues: multipleSelectorModel[];
  selectedPlayers: playersClubDto[];
  selectedCoaches: coachesClubDto[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.clubsService.putGet(params.id).subscribe((putGetDto) => {
        this.model = putGetDto.club;

        this.selectedNationalities = putGetDto.selectedNationalities.map(
          (nationality) => {
            return <multipleSelectorModel>{
              key: nationality.id,
              value: nationality.name,
            };
          }
        );

        this.nonSelectedNationalities = putGetDto.nonSelectedNationalities.map(
          (nationality) => {
            return <multipleSelectorModel>{
              key: nationality.id,
              value: nationality.name,
            };
          }
        );

        this.selectedClubLeagues = putGetDto.selectedClubLeagues.map(
          (clubLeague) => {
            return <multipleSelectorModel>{
              key: clubLeague.id,
              value: clubLeague.name,
            };
          }
        );

        this.nonSelectedClubLeagues = putGetDto.nonSelectedClubLeagues.map(
          (clubLeague) => {
            return <multipleSelectorModel>{
              key: clubLeague.id,
              value: clubLeague.name,
            };
          }
        );

        this.selectedPlayers = putGetDto.players;
        this.selectedCoaches = putGetDto.coaches;
      });
    });
  }

  saveChanges(clubCreationDto: clubCreationDto) {
    this.clubsService.edit(this.model.id, clubCreationDto).subscribe(() => {
      this.router.navigate(['/club/' + this.model.id]);
    });
  }
}
