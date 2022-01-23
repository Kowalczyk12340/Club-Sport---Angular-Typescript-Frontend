import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { nationalityCreationDto, nationalityDto } from '../nationalities.model';
import { NationalitiesService } from '../nationalities.service';

@Component({
  selector: 'app-edit-nationality',
  templateUrl: './edit-nationality.component.html',
  styleUrls: ['./edit-nationality.component.css'],
})
export class EditNationalityComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private nationalitiesService: NationalitiesService,
    private router: Router
  ) {}

  model: nationalityDto;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.nationalitiesService.getById(params.id).subscribe((nationality) => {
        this.model = nationality;
      });
    });
  }

  saveChanges(nationalityCreationDTO: nationalityCreationDto) {
    this.nationalitiesService
      .edit(this.model.id, nationalityCreationDTO)
      .subscribe(() => {
        this.router.navigate(['/nationalities']);
      });
  }
}
