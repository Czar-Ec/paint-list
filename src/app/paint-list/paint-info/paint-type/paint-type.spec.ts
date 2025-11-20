import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintType } from './paint-type';

describe('PaintType', () => {
  let component: PaintType;
  let fixture: ComponentFixture<PaintType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
