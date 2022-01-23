import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coachCreationDto } from '../coaches.model';

@Component({
  selector: 'app-form-coach',
  templateUrl: './form-coach.component.html',
  styleUrls: ['./form-coach.component.css'],
})
export class FormCoachComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  model: coachCreationDto;

  @Output()
  onSaveChanges = new EventEmitter<coachCreationDto>();

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
