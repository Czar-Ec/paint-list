import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintInfo } from './paint-info';

describe('PaintInfo', () => {
  let component: PaintInfo;
  let fixture: ComponentFixture<PaintInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
