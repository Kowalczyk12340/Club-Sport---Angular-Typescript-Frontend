import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { nationalityDto } from 'src/app/nationalities/nationalities.model';
import { NationalitiesService } from 'src/app/nationalities/nationalities.service';
import { clubDto } from '../clubs.model';
import { ClubsService } from '../clubs.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-club-filter',
  templateUrl: './club-filter.component.html',
  styleUrls: ['./club-filter.component.css'],
})
export class ClubFilterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private clubsService: ClubsService,
    private nationalitiesService: NationalitiesService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  form: FormGroup;

  nationalities: nationalityDto[];

  clubs: clubDto[];
  currentPage = 1;
  recordsPerPage = 10;
  initialFormValues: any;
  totalAmountOfRecords;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clubName: '',
      nationalityId: 0,
      upcomingReleases: false,
      hasOwnStadium: false,
    });

    this.initialFormValues = this.form.value;
    this.readParametersFromURL();

    this.nationalitiesService.getAll().subscribe((nationalities) => {
      this.nationalities = nationalities;

      this.filterClubs(this.form.value);

      this.form.valueChanges.subscribe((values) => {
        this.filterClubs(values);
        this.writeParametersInURL();
      });
    });
  }

  filterClubs(values: any) {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.clubsService
      .filter(values)
      .subscribe((response: HttpResponse<clubDto[]>) => {
        this.clubs = response.body;
        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  private readParametersFromURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var obj: any = {};

      if (params.clubName) {
        obj.clubName = params.clubName;
      }

      if (params.nationalityId) {
        obj.nationalityId = Number(params.nationalityId);
      }

      if (params.upcomingReleases) {
        obj.upcomingReleases = params.upcomingReleases;
      }

      if (params.hasOwnStadium) {
        obj.hasOwnStadium = params.hasOwnStadium;
      }

      if (params.page) {
        this.currentPage = params.page;
      }

      if (params.recordsPerPage) {
        this.recordsPerPage = params.recordsPerPage;
      }

      this.form.patchValue(obj);
    });
  }

  private writeParametersInURL() {
    const queryStrings = [];

    const formValues = this.form.value;

    if (formValues.clubName) {
      queryStrings.push(`clubName=${formValues.clubName}`);
    }

    if (formValues.nationalityId != '0') {
      queryStrings.push(`nationalityId=${formValues.nationalityId}`);
    }

    if (formValues.upcomingReleases) {
      queryStrings.push(`upcomingReleases=${formValues.upcomingReleases}`);
    }

    if (formValues.hasOwnStadium) {
      queryStrings.push(`hasOwnStadium=${formValues.hasOwnStadium}`);
    }

    queryStrings.push(`page=${this.currentPage}`);
    queryStrings.push(`recordsPerPage=${this.recordsPerPage}`);

    this.location.replaceState('clubs/filter', queryStrings.join('&'));
  }

  paginatorUpdate(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.writeParametersInURL();
    this.filterClubs(this.form.value);
  }

  clearForm() {
    this.form.patchValue(this.initialFormValues);
  }

  onDelete() {
    this.filterClubs(this.form.value);
  }
}
