import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coachCreationDto } from '../coaches.model';
import { CoachService } from '../coaches.service';

@Component({
  selector: 'app-create-coach',
  templateUrl: './create-coach.component.html',
  styleUrls: ['./create-coach.component.css'],
})
export class CreateCoachComponent implements OnInit {
  constructor(private coachService: CoachService, private router: Router) {}

  ngOnInit(): void {}

  saveChanges(coachCreationDto: coachCreationDto) {
    this.coachService.create(coachCreationDto).subscribe(() => {
      this.router.navigate(['/coaches']);
    });
  }
}
