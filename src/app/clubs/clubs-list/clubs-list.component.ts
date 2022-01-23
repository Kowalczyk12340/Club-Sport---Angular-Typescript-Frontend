import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClubsService } from '../clubs.service';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.css'],
})
export class ClubsListComponent implements OnInit {
  constructor(private clubsService: ClubsService) {}

  ngOnInit(): void {}

  @Input()
  clubs;

  @Output()
  onDelete = new EventEmitter<void>();

  remove(id: number) {
    this.clubsService.delete(id).subscribe(() => {
      this.onDelete.emit();
    });
  }
}
