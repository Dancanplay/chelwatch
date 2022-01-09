import { Component, OnInit } from '@angular/core';
import {NhlapiService} from '../nhlapi.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild } from '@angular/core';
import { Player } from '@vime/angular';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('player') player!: Player;

  date: Date;
  feedId: number;
  streamer: string;
  broken = false;
  loading = true;
  hlsConfig = {
    xhrSetup: (xhr, link) => {
      let proxy = localStorage.getItem('proxy'); let m3u8 = localStorage.getItem('m3u8_target');
      link = link.replace('mf.svc.nhl.com', `${proxy}/?https://${m3u8}`);
      xhr.open('GET', link, true);
    },
    autoStartLoad: true,
    debug: true
  };

  constructor(private nhlapiService: NhlapiService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(params => {
      this.date = new Date(params.get('date'));
      this.feedId = parseInt(params.get('feed'), 10);
    });

    this.fetchStream();
  }

  fetchStream(): void {
    this.nhlapiService.getM3U(this.date, this.feedId).subscribe(url => {
      if (url !== 'Not available yet') {
        this.streamer = url;
      }
      this.loading = false;
    });
  }

  redirect(): void {
    if (history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }
}
