import { Component, OnInit } from '@angular/core';
import { nationalityDto } from '../nationalities.model';
import { NationalitiesService } from '../nationalities.service';

@Component({
  selector: 'app-index-nationalities',
  templateUrl: './index-nationalities.component.html',
  styleUrls: ['./index-nationalities.component.css'],
})
export class IndexNationalitiesComponent implements OnInit {
  nationalities: nationalityDto[];

  columnsToDisplay = ['name', 'actions'];

  constructor(private nationalitiesService: NationalitiesService) {}

  ngOnInit(): void {
    this.loadNationalities();
  }

  loadNationalities() {
    this.nationalitiesService.getAll().subscribe((nationalities) => {
      this.nationalities = nationalities;
    });
  }

  delete(id: number) {
    this.nationalitiesService.delete(id).subscribe(() => {
      this.loadNationalities();
    });
  }
}
