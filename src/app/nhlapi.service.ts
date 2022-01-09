import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhlapiService {
  #cdn = 'akc';
  #M3U_host: string;
  #CORS_proxy: string;

  constructor(private http: HttpClient) {
    this.#M3U_host = localStorage.getItem('m3u8_target');
    this.#CORS_proxy = localStorage.getItem('proxy');
  }
  static DateToString(date: Date): string {
    const year = date.getFullYear(); const month = date.getMonth() + 1; const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
  getMatches(date: Date): Observable<any> {
    const formatted = NhlapiService.DateToString(date);
    const apiURL = `https://statsapi.web.nhl.com/api/v1/schedule?date=${formatted}&expand=schedule.teams,schedule.game.content.media.epg`;
    return this.http.get(apiURL);
  }

  getM3U(date: Date, feedId: number): Observable<any> {
    const formatted = date.toISOString().slice(0, 10);
    const apiURL = `https://${this.#CORS_proxy}/https://${this.#M3U_host}/getM3U8.php?league=nhl&date=${formatted}&id=${feedId}&cdn=${this.#cdn}`;
    return this.http.get(apiURL, {responseType: 'text'});
  }
  getCloseMatches(): Observable<any> {
    const start = NhlapiService.DateToString(new Date());
    const end = NhlapiService.DateToString(new Date(Date.now() + 7.8e10));// 3 months from now
    const apiURL = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${start}&endDate=${end}&expand=schedule.teams,schedule.game.content.media.epg`;
    return this.http.get(apiURL);
  }
}
