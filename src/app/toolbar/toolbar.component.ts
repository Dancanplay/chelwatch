import {Component, OnInit, Input, Inject} from '@angular/core';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export const tooltipValues: MatTooltipDefaultOptions = {
  hideDelay: 0, showDelay: 0, touchendHideDelay: 0
};

export interface Settings {
  proxy: string;
  m3u8_target: string;
}

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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  settingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsDialog, {
      width: '500px',
      data: {
        proxy: localStorage.getItem('proxy'),
        m3u8_target: localStorage.getItem('m3u8_target')
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        localStorage.setItem('m3u8_target', result.m3u8_target);
        localStorage.setItem('proxy', result.proxy);
      }
    });
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

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html',
})
export class SettingsDialog {
  constructor(
    public dialogRef: MatDialogRef<SettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Settings) {
  }
}

