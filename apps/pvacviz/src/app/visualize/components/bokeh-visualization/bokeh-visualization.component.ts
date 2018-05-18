import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'pvz-bokeh-visualization',
  templateUrl: './bokeh-visualization.component.html',
  styleUrls: ['./bokeh-visualization.component.scss']
})
export class BokehVisualizationComponent implements OnInit {
  visualizeURL: string;
  processId: number;
  fileId: number;

  constructor() {
    this.bokehUrl = config.bokehUrl();
    this.processId = route.snapshot.parent.parent.params['processId'];
    this.fileId = route.snapshot.parent.params['fileId'];

  }

  ngOnInit() {
    this.visualizeURL = this.domSanitizer
      .bypassSecurityTrustResourceUrl(
        this.bokehUrl + '/processes/' +
        this.processId + '/results/' + this.fileId + '/visualize');
  }

}
