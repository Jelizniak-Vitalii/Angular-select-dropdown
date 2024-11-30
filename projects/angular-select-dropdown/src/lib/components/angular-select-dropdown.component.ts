import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AngularSelectDropdown } from '../models';

interface SelectedItem {
  value: any;
  name: string;
}

@Component({
  selector: 'angular-select-dropdown',
  templateUrl: 'angular-select-dropdown.component.html',
  styleUrls: [ 'angular-select-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AngularSelectDropdownComponent),
      multi: true
    }
  ]
})
export class AngularSelectDropdownComponent<T> implements ControlValueAccessor, OnDestroy {
  /**
   * Handler function to extract the label for each item.
   * @param item The item from the list.
   * @returns The label (name or value) of the item.
   */
  @Input() labelHandler: (item: T) => any = (item) => (item as AngularSelectDropdown)['name'] || item;

  /**
   * Defines the key used to sort the dropdown items.
   * @param sortKeyName The key used to sort the items, default is 'value'.
   * @default 'value'
   */
  @Input() sortKeyName: string = 'value';

  /**
   * List of items to populate the dropdown.
   * This setter updates the internal store of items and triggers an update.
   * @param items The array of items to be displayed in the dropdown.
   */
  @Input() set items(items: T[]) {
    this._items = items;
    this.updateItems(items);
  }

  /**
   * Determines whether the dropdown allows clearing the selection.
   * @param isClearable If true, the dropdown will show a clear button.
   * @default false
   */
  @Input() isClearable: boolean = false;

  /**
   * Determines whether the dropdown is disabled.
   * @param disabled If true, the dropdown is disabled and cannot be interacted with.
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * Determines whether the dropdown menu should close when the selected item is cleared.
   * @param closeMenuOnClear If true, the dropdown will close when the selection is cleared.
   * @default true
   */
  @Input() closeMenuOnClear: boolean = true;

  /**
   * Placeholder text displayed when no item is selected.
   * @param placeholder The placeholder text.
   * @default ''
   */
  @Input() placeholder: string = '';

  /**
   * Message displayed when no items match the search query.
   * @param notFoundMessage The message to display when no items are found.
   * @default 'Nothing found'
   */
  @Input() notFoundMessage: string = 'Nothing found';

  /**
   * Event emitted when an item is selected.
   * @param selectItem The selected item is emitted as an event.
   */
  @Output() selectItem: EventEmitter<T> = new EventEmitter();

  @HostBinding('class') hostClasses = 'angular-select-dropdown';

  private _items: T[] = [];

  get items(): T[] {
    return this._items;
  }

  data: (number | string) | (number | string)[] = '';
  isDropdownOpen: boolean = false;
  itemsStore: AngularSelectDropdown[] = [];
  selectedItem: SelectedItem = {
    value: null,
    name: ''
  };

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.isDropdownOpen = false;
  }

  private onTouched = () => {};

  private onChange: (value: number | string | null) => void = () => {};

  registerOnChange(onChange: (value: number | string | null) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  writeValue(obj: number | string) {
    this.data = obj;
    this.updateItems(this.items);
  }

  private updateData(data: number | string | null) {
    this.onChange(data);
    this.onTouched();
  }

  private updateItems(items: T[]) {
    if (items && items.length) {
      this.itemsStore = items.map((item: any) => ({
        value: item[this.sortKeyName as keyof T] ?? this.labelHandler(item),
        name: this.labelHandler(item),
        disabled: !!item?.['disabled']
      })) as AngularSelectDropdown[];
    } else {
      this.itemsStore = [];
    }

    this.updateSelectedItem();
    this.cdRef.markForCheck();
  }

  private updateSelectedItem(item?: AngularSelectDropdown) {
    const selectedItem = this.itemsStore.find(item => item?.value == this.data);

    this.selectedItem = {
      value: item?.value ?? (selectedItem?.value ?? null),
      name: item?.name ?? (selectedItem?.name ?? '')
    };
  }

  trackByValue(index: number, item: AngularSelectDropdown) {
    return item.value;
  }

  closeDropdownMenu() {
    this.isDropdownOpen = false;
  }

  onClickRemove(event: MouseEvent) {
    event.stopImmediatePropagation();

    if (this.selectedItem.value && this.selectedItem.name) {
      this.updateSelectedItem();
      this.updateData(null);
      this.selectItem.emit();

      if (this.closeMenuOnClear) {
        this.closeDropdownMenu();
      }
    }
  }

  onSelectItem(item: AngularSelectDropdown) {
    this.updateData(item.value);
    this.updateSelectedItem(item);
    this.closeDropdownMenu();

    this.selectItem.emit(item.value);
  }

  onSelectClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
