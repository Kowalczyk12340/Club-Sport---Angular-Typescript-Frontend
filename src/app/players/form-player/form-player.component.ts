import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { playerCreationDto } from '../players.model';

@Component({
  selector: 'app-form-player',
  templateUrl: './form-player.component.html',
  styleUrls: ['./form-player.component.css'],
})
export class FormPlayerComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  model: playerCreationDto;

  @Output()
  onSaveChanges = new EventEmitter<playerCreationDto>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      dateOfBirth: '',
      picture: '',
      biography: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(image) {
    this.form.get('picture').setValue(image);
  }

  changeMarkdown(content) {
    this.form.get('biography').setValue(content);
  }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }
}
