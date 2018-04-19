import { Component, OnInit, Input } from '@angular/core';

import { AppState, Journey } from '../../../models';
import { GoogleUserInfo } from '../../../auth/models/google-user';

@Component({
  selector: 'app-ctrls-overlay',
  templateUrl: './ctrls-overlay.component.html',
  styleUrls: ['./ctrls-overlay.component.scss']
})
export class CtrlsOverlayComponent implements OnInit {
  @Input() appState: AppState;
  @Input() journey: Journey;
  @Input() loading: boolean;
  @Input() userInfo: GoogleUserInfo;

  constructor() { }

  ngOnInit() { }
}
