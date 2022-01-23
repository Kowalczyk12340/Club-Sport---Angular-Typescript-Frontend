import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { playerCreationDto } from '../players.model';
import { PlayerService } from '../players.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
})
export class CreatePlayerComponent implements OnInit {
  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {}

  saveChanges(playerCreationDto: playerCreationDto) {
    this.playerService.create(playerCreationDto).subscribe(() => {
      this.router.navigate(['/players']);
    });
  }
}
