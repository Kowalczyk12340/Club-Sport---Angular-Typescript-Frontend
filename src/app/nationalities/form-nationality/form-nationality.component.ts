import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUppercase';
import { nationalityCreationDto } from '../nationalities.model';

@Component({
  selector: 'app-form-nationality',
  templateUrl: './form-nationality.component.html',
  styleUrls: ['./form-nationality.component.css'],
})
export class FormNationalityComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input()
  model: nationalityCreationDto;

  form: FormGroup;

  @Output()
  onSaveChanges: EventEmitter<nationalityCreationDto> = new EventEmitter<nationalityCreationDto>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            firstLetterUppercase(),
          ],
        },
      ],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }

  getErrorMessageFieldName() {
    const field = this.form.get('name');

    if (field.hasError('required')) {
      return 'The name field is required';
    }

    if (field.hasError('minlength')) {
      return 'The minimum length is 3';
    }

    if (field.hasError('firstLetterUppercase')) {
      return field.getError('firstLetterUppercase').message;
    }

    return '';
  }
}
