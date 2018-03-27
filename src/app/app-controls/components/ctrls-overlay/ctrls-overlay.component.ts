import { Component, OnInit, Input } from '@angular/core';

import { AppState } from '../../../models';

@Component({
  selector: 'app-ctrls-overlay',
  templateUrl: './ctrls-overlay.component.html',
  styleUrls: ['./ctrls-overlay.component.scss']
})
export class CtrlsOverlayComponent implements OnInit {
  @Input() appState: AppState;

  constructor() { }

  ngOnInit() { }
}
