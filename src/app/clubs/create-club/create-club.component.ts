import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { clubCreationDto } from '../clubs.model';
import { ClubsService } from '../clubs.service';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.css'],
})
export class CreateClubComponent implements OnInit {
  constructor(private clubsService: ClubsService, private router: Router) {}

  nonSelectedNationalities: multipleSelectorModel[];
  nonSelectedClubLeagues: multipleSelectorModel[];

  ngOnInit(): void {
    this.clubsService.postGet().subscribe((response) => {
      this.nonSelectedNationalities = response.nationalities.map(
        (nationality) => {
          return <multipleSelectorModel>{
            key: nationality.id,
            value: nationality.name,
          };
        }
      );

      this.nonSelectedClubLeagues = response.clubLeagues.map((clubLeague) => {
        return <multipleSelectorModel>{
          key: clubLeague.id,
          value: clubLeague.name,
        };
      });
    });
  }

  saveChanges(clubCreationDto: clubCreationDto) {
    console.log(clubCreationDto);
    this.clubsService.create(clubCreationDto).subscribe((id) => {
      this.router.navigate(['/club/' + id]);
    });
  }
}
