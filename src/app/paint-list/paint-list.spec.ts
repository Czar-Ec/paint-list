import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintList } from './paint-list';

describe('PaintList', () => {
  let component: PaintList;
  let fixture: ComponentFixture<PaintList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
