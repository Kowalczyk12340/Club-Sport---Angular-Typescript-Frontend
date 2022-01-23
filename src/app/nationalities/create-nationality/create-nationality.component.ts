import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parseWebApiErrors } from 'src/app/utilities/utils';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUppercase';
import { nationalityCreationDto } from '../nationalities.model';
import { NationalitiesService } from '../nationalities.service';

@Component({
  selector: 'app-create-nationality',
  templateUrl: './create-nationality.component.html',
  styleUrls: ['./create-nationality.component.css'],
})
export class CreateNationalityComponent implements OnInit {
  errors: string[] = [];

  constructor(
    private router: Router,
    private nationalitiesService: NationalitiesService
  ) {}

  ngOnInit(): void {}

  saveChanges(nationalityCreationDto: nationalityCreationDto) {
    this.nationalitiesService.create(nationalityCreationDto).subscribe(
      () => {
        this.router.navigate(['nationalities']);
      },
      (error) => (this.errors = parseWebApiErrors(error))
    );
  }
}
