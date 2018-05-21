import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pvz-bokeh-visualization',
  templateUrl: './bokeh-visualization.component.html',
  styleUrls: ['./bokeh-visualization.component.scss']
})
export class BokehVisualizationComponent implements OnInit {
  @Input()
  visualizeUrl: string;

  constructor() { }
  ngOnInit() { }

}
