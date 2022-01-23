import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coachCreationDto, coachDto } from '../coaches.model';
import { CoachService } from '../coaches.service';

@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.css'],
})
export class EditCoachComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private coachService: CoachService,
    private router: Router
  ) {}

  model: coachDto;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.coachService
        .getById(params.id)
        .subscribe((coach) => (this.model = coach));
    });
  }

  saveChanges(coachCreationDto: coachCreationDto) {
    console.log(coachCreationDto);
    this.coachService.edit(this.model.id, coachCreationDto).subscribe(() => {
      this.router.navigate(['/coaches']);
    });
  }
}
