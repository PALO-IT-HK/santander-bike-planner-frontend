import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-journey',
  templateUrl: './confirm-journey.component.html',
  styleUrls: ['./confirm-journey.component.scss']
})
export class ConfirmJourneyComponent implements OnInit {
  @Input() duration: number;
  @Output() confirm = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.duration = 0;
  }

  confirmJourney($event) {
    this.confirm.emit($event);
  }
}
