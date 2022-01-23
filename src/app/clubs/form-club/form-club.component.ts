import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coachesClubDto } from 'src/app/coaches/coaches.model';
import { playersClubDto } from 'src/app/players/players.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { clubCreationDto, clubDto } from '../clubs.model';

@Component({
  selector: 'app-form-club',
  templateUrl: './form-club.component.html',
  styleUrls: ['./form-club.component.css'],
})
export class FormClubComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  model: clubDto;

  @Output()
  onSaveChanges = new EventEmitter<clubCreationDto>();

  @Input()
  nonSelectedNationalities: multipleSelectorModel[] = [];

  @Input()
  selectedNationalities: multipleSelectorModel[] = [];

  @Input()
  nonSelectedClubLeagues: multipleSelectorModel[] = [];

  @Input()
  selectedClubLeagues: multipleSelectorModel[] = [];

  @Input()
  selectedPlayers: playersClubDto[] = [];

  @Input()
  selectedCoaches: coachesClubDto[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clubName: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      summary: '',
      hasOwnStadium: false,
      description: '',
      releaseDate: '',
      poster: '',
      nationalitiesIds: '',
      clubLeaguesIds: '',
      players: '',
      coaches: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(file: File) {
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(content: string) {
    this.form.get('summary').setValue(content);
  }

  saveChanges() {
    const nationalitiesIds = this.selectedNationalities.map(
      (value) => value.key
    );
    this.form.get('nationalitiesIds').setValue(nationalitiesIds);

    const clubLeaguesIds = this.selectedClubLeagues.map((value) => value.key);
    this.form.get('clubLeaguesIds').setValue(clubLeaguesIds);

    const players = this.selectedPlayers.map((val) => {
      return { id: val.id, position: val.position };
    });
    this.form.get('players').setValue(players);

    const coaches = this.selectedCoaches.map((val) => {
      return { id: val.id, license: val.license };
    });
    this.form.get('coaches').setValue(coaches);

    this.onSaveChanges.emit(this.form.value);
  }
}
