import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Match, Feed} from '../match';
import {NhlapiService} from '../nhlapi.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[];
  noMatches = false;

  // datepicker stuff
  minDate: Date;
  maxDate: Date;
  currentDate: Date;
  datepicker: FormControl;

  timeOptions = { dateStyle: 'full', timeStyle: 'long'};

  constructor(private router: Router, private route: ActivatedRoute, private nhlapiService: NhlapiService) {
    const now = new Date().getFullYear();
    this.minDate = new Date(now - 10, 0 , 1);
    this.maxDate = new Date(now + 1, 11, 1);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (isNaN(Date.parse(params.get('date')))) {
        this.currentDate = new Date();
        this.currentDate = new Date(this.currentDate.toLocaleString('en-US', {timeZone: 'America/Los_Angeles'}));
      } else {
        this.currentDate = new Date(params.get('date'));
      }
    });
    this.datepicker = new FormControl({value: this.currentDate, disabled: true}, Validators.required);

    this.getMatches();
  }

  getMatches(): void {
    this.noMatches = false;
    this.matches = [];
    this.nhlapiService.getMatches(this.currentDate).subscribe(
      data => {
        if (data.dates.length) {
          for (const game of data.dates[0].games) {
            const feeds: Feed[] = [];
            if (game.content.media) {
              for (const feed of game.content.media.epg[0].items) {
                feeds.push({
                  feedId: feed.mediaPlaybackId,
                  feedName: feed.mediaFeedType
                });
              }
            }
            this.matches.push({
              homeTeam: game.teams.home.team.name,
              awayTeam: game.teams.away.team.name,
              status: game.status.detailedState,
              gameDate: new Date(game.gameDate),
              feeds
            });
          }
        } else {
          this.noMatches = true;
        }
      },
      ((error: HttpErrorResponse) => console.log(error.message))
    );
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.currentDate = new Date(event.value);
    this.router.navigateByUrl('/matches/' + NhlapiService.DateToString(this.currentDate));
    this.getMatches();
  }
}
