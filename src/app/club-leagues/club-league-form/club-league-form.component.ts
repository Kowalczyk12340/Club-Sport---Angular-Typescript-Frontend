import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coordinatesMap } from 'src/app/utilities/map/coordinate';
import { clubLeaguesCreationDto, clubLeaguesDto } from '../club-leagues.model';

@Component({
  selector: 'app-club-league-form',
  templateUrl: './club-league-form.component.html',
  styleUrls: ['./club-league-form.component.css'],
})
export class ClubLeagueFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  model: clubLeaguesDto;

  @Output()
  onSaveChanges = new EventEmitter<clubLeaguesCreationDto>();

  initialCoordinates: coordinatesMap[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      longitude: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      latitude: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.initialCoordinates.push({
        latitude: this.model.latitude,
        longitude: this.model.longitude,
      });
    }
  }

  onSelectedLocation(coordinates: coordinatesMap) {
    this.form.patchValue(coordinates);
  }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }
}
