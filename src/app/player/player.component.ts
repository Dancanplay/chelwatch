import { Component, OnInit } from '@angular/core';
import Hls from 'hls.js';
import {NhlapiService} from '../nhlapi.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  date: Date;
  feedId: number;
  streamURL: string;
  hls: Hls;
  constructor(private nhlapiService: NhlapiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.date = new Date(params.get('date'));
      this.feedId = parseInt(params.get('feed'), 10);
    });
    this.nhlapiService.getM3U(this.date, this.feedId).subscribe(url => {
        this.streamURL = url;
        console.log(url);
        this.hls = new Hls({ xhrSetup: (xhr, link) => {
            link = link.replace('mf.svc.nhl.com', 'freegamez.ga');
            xhr.open('GET', link, true);
          }, autoStartLoad: true
        });
        this.hls.attachMedia((document.getElementById('video')) as HTMLMediaElement);
        this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        this.hls.loadSource(this.streamURL);
      });
    });
  }
}
