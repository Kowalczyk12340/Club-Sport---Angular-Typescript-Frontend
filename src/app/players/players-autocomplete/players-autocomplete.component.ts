import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { playersClubDto } from '../players.model';
import { PlayerService } from '../players.service';

@Component({
  selector: 'app-players-autocomplete',
  templateUrl: './players-autocomplete.component.html',
  styleUrls: ['./players-autocomplete.component.css'],
})
export class PlayersAutocompleteComponent implements OnInit {
  constructor(private playersService: PlayerService) {}

  control: FormControl = new FormControl();

  @Input()
  selectedPlayers: playersClubDto[] = [];

  playersToDisplay: playersClubDto[] = [];

  columnsToDisplay = ['picture', 'name', 'position', 'actions'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.playersService.searchByName(value).subscribe((players) => {
        this.playersToDisplay = players;
      });
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);

    this.control.patchValue('');

    if (
      this.selectedPlayers.findIndex((x) => x.id == event.option.value.id) !==
      -1
    ) {
      return;
    }

    this.selectedPlayers.push(event.option.value);
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  remove(player) {
    const index = this.selectedPlayers.findIndex((a) => a.name === player.name);
    this.selectedPlayers.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectedPlayers.findIndex(
      (player) => player === event.item.data
    );
    moveItemInArray(this.selectedPlayers, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
