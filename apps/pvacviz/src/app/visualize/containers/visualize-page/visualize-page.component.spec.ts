import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizePageComponent } from './visualize-page.component';

describe('VisualizePageComponent', () => {
  let component: VisualizePageComponent;
  let fixture: ComponentFixture<VisualizePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizePageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
