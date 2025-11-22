import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintBrand } from './paint-brand';

describe('PaintBrand', () => {
  let component: PaintBrand;
  let fixture: ComponentFixture<PaintBrand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintBrand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintBrand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
