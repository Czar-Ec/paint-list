import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { FilterService } from '../shared/filter-service';

@Component({
  selector: 'app-filter',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  public filterFormGroup: FormGroup;

  /**
   * Constructor injecting the FilterService.
   */
  private readonly filterService = inject(FilterService);

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

  /**
   * Sets up a listener for changes in the filter input field with debounce.
   */
  private _filterListener() {
    this.filterFormGroup
      .get('filterStr')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value) => {
        this.filterService.updateFilter(value);
      });
  }
}
