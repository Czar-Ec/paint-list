import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  public filterFormGroup: FormGroup;

  constructor() {
    this.filterFormGroup = new FormGroup({
      filterStr: new FormControl(''),
    });

    this._filterListener();
  }

  /**
   * Clears the filter input field.
   */
  public clearFilter() {
    this.filterFormGroup.get('filterStr')?.setValue('');
  }

  private _filterListener() {
    this.filterFormGroup
      .get('filterStr')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value) => {
        // this.infoToolsService.applyFilters(value);
      });
  }
}
