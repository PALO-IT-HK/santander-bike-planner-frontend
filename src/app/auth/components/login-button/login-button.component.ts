import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements AfterViewInit {

  constructor(private element: ElementRef, private gService: GoogleService) { }

  ngAfterViewInit() {
    this.gService.googleInit(this.element.nativeElement.firstChild);
  }
}
