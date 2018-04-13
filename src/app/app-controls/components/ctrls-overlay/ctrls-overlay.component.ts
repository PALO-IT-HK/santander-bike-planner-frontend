import { Component, OnInit, Input } from '@angular/core';

import { AppState, Journey } from '../../../models';

@Component({
  selector: 'app-ctrls-overlay',
  templateUrl: './ctrls-overlay.component.html',
  styleUrls: ['./ctrls-overlay.component.scss']
})
export class CtrlsOverlayComponent implements OnInit {
  @Input() appState: AppState;
  @Input() journey: Journey;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() { }
}
