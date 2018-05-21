import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeFileComponent } from './visualize-file.component';

describe('VisualizeFileComponent', () => {
  let component: VisualizeFileComponent;
  let fixture: ComponentFixture<VisualizeFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
