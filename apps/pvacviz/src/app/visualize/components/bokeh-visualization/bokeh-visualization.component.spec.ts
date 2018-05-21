import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BokehVisualizationComponent } from './bokeh-visualization.component';

describe('BokehVisualizationComponent', () => {
  let component: BokehVisualizationComponent;
  let fixture: ComponentFixture<BokehVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BokehVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BokehVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
