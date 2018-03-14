import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pvz-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  collapsible: boolean = true;
  collapsed: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
