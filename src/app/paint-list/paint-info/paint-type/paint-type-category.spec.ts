import { TestBed } from '@angular/core/testing';

import { PaintTypeCategory } from './paint-type-category';

describe('PaintTypeCategory', () => {
  let service: PaintTypeCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintTypeCategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
