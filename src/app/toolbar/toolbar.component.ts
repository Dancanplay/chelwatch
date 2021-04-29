import { Component, OnInit, Input } from '@angular/core';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';

export const tooltipValues: MatTooltipDefaultOptions = {
  hideDelay: 0, showDelay: 0, touchendHideDelay: 0
};

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipValues}
  ]
})

export class ToolbarComponent implements OnInit {
  @Input() title?: string;
  text = 'Copy link to clipboard';
  constructor() { }

  ngOnInit(): void {
  }

  shareClick(): void {
    const URL = window.location.href;
    const temp = document.createElement('input');
    document.body.appendChild(temp);
    temp.value = URL; temp.select(); document.execCommand('copy');
    document.body.removeChild(temp);
    this.text = 'Link copied!';
  }
}
