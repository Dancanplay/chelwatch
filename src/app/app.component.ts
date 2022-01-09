import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chelwatch';

  constructor() {
    if(localStorage.getItem('m3u8_target') == null && localStorage.getItem('proxy') == null) {
      localStorage.setItem('m3u8_target', 'freesports.ddns.net');
      localStorage.setItem('proxy', 'green-pine-a9e2.deancaners.workers.dev');
    }
  }
}
