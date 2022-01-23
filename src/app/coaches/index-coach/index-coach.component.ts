import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { coachDto } from '../coaches.model';
import { CoachService } from '../coaches.service';

@Component({
  selector: 'app-index-coach',
  templateUrl: './index-coach.component.html',
  styleUrls: ['./index-coach.component.css'],
})
export class IndexCoachesComponent implements OnInit {
  constructor(private coachesService: CoachService) {}

  coaches: coachDto[];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.coachesService
      .get(this.currentPage, this.pageSize)
      .subscribe((response: HttpResponse<coachDto[]>) => {
        this.coaches = response.body;
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
    this.coachesService.delete(id).subscribe(() => {
      this.loadData();
    });
  }
}
