import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhlapiService {
  #cdn = 'akc';
  #M3U_host = 'freegamez.ga';
  #CORS_proxy = 'https://green-pine-a9e2.deancaners.workers.dev/?';

  constructor(private http: HttpClient) { }
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
    const apiURL = `${this.#CORS_proxy}https://${this.#M3U_host}/getM3U8.php?league=nhl&date=${formatted}&id=${feedId}&cdn=${this.#cdn}`;
    return this.http.get(apiURL, {responseType: 'text'});
  }
}
