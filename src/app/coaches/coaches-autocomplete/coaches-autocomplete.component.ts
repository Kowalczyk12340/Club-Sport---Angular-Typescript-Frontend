import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { coachesClubDto } from '../coaches.model';
import { CoachService } from '../coaches.service';

@Component({
  selector: 'app-coaches-autocomplete',
  templateUrl: './coaches-autocomplete.component.html',
  styleUrls: ['./coaches-autocomplete.component.css'],
})
export class CoachesAutocompleteComponent implements OnInit {
  constructor(private coachesService: CoachService) {}

  control: FormControl = new FormControl();

  @Input()
  selectedCoaches: coachesClubDto[] = [];

  coachesToDisplay: coachesClubDto[] = [];

  columnsToDisplay = ['picture', 'name', 'license', 'actions'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.coachesService.searchByName(value).subscribe((coaches) => {
        this.coachesToDisplay = coaches;
      });
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);

    this.control.patchValue('');

    if (
      this.selectedCoaches.findIndex((x) => x.id == event.option.value.id) !==
      -1
    ) {
      return;
    }

    this.selectedCoaches.push(event.option.value);
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  remove(coach) {
    const index = this.selectedCoaches.findIndex((a) => a.name === coach.name);
    this.selectedCoaches.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectedCoaches.findIndex(
      (coach) => coach === event.item.data
    );
    moveItemInArray(this.selectedCoaches, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
