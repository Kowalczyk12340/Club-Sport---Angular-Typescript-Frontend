import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { coordinatesMapWithMessage } from 'src/app/utilities/map/coordinate';
import { RatingService } from 'src/app/utilities/rating.service';
import Swal from 'sweetalert2';
import { clubDto } from '../clubs.model';
import { ClubsService } from '../clubs.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css'],
})
export class ClubDetailsComponent implements OnInit {
  constructor(
    private clubsService: ClubsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ratingsService: RatingService
  ) {}

  club: clubDto;
  releaseDate: Date;
  descriptionUrl: SafeResourceUrl;
  coordinates: coordinatesMapWithMessage[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.clubsService.getById(params.id).subscribe((club) => {
        this.club = club;
        this.releaseDate = new Date(club.releaseDate);
        this.descriptionUrl = this.generateYoutubeUrlForEmbeddedVideo(
          club.description
        );
        this.coordinates = club.clubLeagues.map((clubLeague) => {
          return {
            latitude: clubLeague.latitude,
            longitude: clubLeague.longitude,
            message: clubLeague.name,
          };
        });
      });
    });
  }

  generateYoutubeUrlForEmbeddedVideo(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }
    // https://www.youtube.com/watch?v=LKFuXETZUsI
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  onRating(rate: number) {
    this.ratingsService.rate(this.club.id, rate).subscribe(() => {
      Swal.fire('Success', 'Your vote has been received', 'success');
    });
  }
}
