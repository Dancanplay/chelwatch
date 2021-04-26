import { Component, OnInit } from '@angular/core';
import {NhlapiService} from '../nhlapi.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  date: Date;
  feedId: number;
  streamURL: string;
  brokenStream = false;
  hlsConfig: object;
  constructor(private nhlapiService: NhlapiService, private route: ActivatedRoute, private router: Router) { }

  redirect(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.date = new Date(params.get('date'));
      this.feedId = parseInt(params.get('feed'), 10);
    });

    this.nhlapiService.getM3U(this.date, this.feedId).subscribe(url => {
        if (url !== 'Not available yet') {
          this.streamURL = url;
        } else {
          this.brokenStream = true;
        }
        this.hlsConfig = {
            xhrSetup: (xhr, link) => {
            link = link.replace('mf.svc.nhl.com', 'freegamez.ga');
            xhr.open('GET', link, true);
          },
            autoStartLoad: true
          };
    });
  }
}
