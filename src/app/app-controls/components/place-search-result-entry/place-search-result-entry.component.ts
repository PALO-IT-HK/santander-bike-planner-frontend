import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapLocation } from '../../../models';

@Component({
  selector: 'app-place-search-result-entry',
  templateUrl: './place-search-result-entry.component.html',
  styleUrls: ['./place-search-result-entry.component.scss']
})
export class PlaceSearchResultEntryComponent implements OnInit {
  @Input() place: MapLocation;
  @Output() select: EventEmitter<MapLocation> = new EventEmitter<MapLocation>();

  constructor() { }

  ngOnInit() {
  }

  selectThis() {
    this.select.emit(this.place);
  }
}
