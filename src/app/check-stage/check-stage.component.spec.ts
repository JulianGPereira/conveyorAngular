import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStageComponent } from './check-stage.component';

describe('CheckStageComponent', () => {
  let component: CheckStageComponent;
  let fixture: ComponentFixture<CheckStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
