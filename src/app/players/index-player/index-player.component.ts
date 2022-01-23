import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { playerDto } from '../players.model';
import { PlayerService } from '../players.service';

@Component({
  selector: 'app-index-player',
  templateUrl: './index-player.component.html',
  styleUrls: ['./index-player.component.css'],
})
export class IndexPlayersComponent implements OnInit {
  constructor(private playersService: PlayerService) {}

  players: playerDto[];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.playersService
      .get(this.currentPage, this.pageSize)
      .subscribe((response: HttpResponse<playerDto[]>) => {
        this.players = response.body;
        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id: number) {
    this.playersService.delete(id).subscribe(() => {
      this.loadData();
    });
  }
}
