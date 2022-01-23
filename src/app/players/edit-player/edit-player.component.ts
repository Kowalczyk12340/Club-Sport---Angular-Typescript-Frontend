import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { playerCreationDto, playerDto } from '../players.model';
import { PlayerService } from '../players.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
})
export class EditPlayerComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) {}

  model: playerDto;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.playerService
        .getById(params.id)
        .subscribe((player) => (this.model = player));
    });
  }

  saveChanges(playerCreationDto: playerCreationDto) {
    console.log(playerCreationDto);
    this.playerService.edit(this.model.id, playerCreationDto).subscribe(() => {
      this.router.navigate(['/players']);
    });
  }
}
