# Angular Select Dropdown Component

A flexible and customizable dropdown component for Angular that allows users to select from a list of items. It supports features like sorting, clearing selections, and customizable item labels.

## Features

- **Customizable Label Handler**: Use a function to define how to extract the label for each item.
- **Sort Items**: Sort items based on a specified key.
- **Clearable**: Allows clearing the selection with an optional clear button.
- **Disabled State**: Disable the dropdown and prevent interaction.
- **Dynamic Search**: Shows a message when no items match the search query.
- **Close on Clear**: Close the dropdown when the selection is cleared (optional).
- **Placeholder**: Display a placeholder text when no item is selected.

## Installation

You can install the component via npm:

```bash
npm install angular-select-dropdown --save
```

## Usage

To use the `AngularSelectDropdownComponent` in your Angular project:

1. Import the module in your Angular module:

```typescript
import { AngularSelectDropdownModule } from 'angular-select-dropdown';

@NgModule({
  imports: [
    AngularSelectDropdownModule
  ]
})
export class AppModule {}
```
## Inputs

- `labelHandler: (item: T) => any`: A function that extracts the label for each item. Default is `(item) => item.name || item` is used, which tries to get name from the item or returns the item itself if name is missing.
- `sortKeyName: string`: The key used to sort the items. Default is `'value'`.
- `items: T[]`: An array of items to populate the dropdown.
- `isClearable: boolean`: If true, shows a clear button to remove the selected item. Default is `false`.
- `disabled: boolean`: If true, the dropdown is disabled. Default is `false`.
- `closeMenuOnClear: boolean`: If true, the dropdown menu will close when the selection is cleared. Default is `true`.
- `placeholder: string`: The placeholder text when no item is selected. Default is an empty string.
- `notFoundMessage: string`: The message to display when no items match the search. Default is `'Nothing found'`.

## Outputs

- `selectItem: EventEmitter<T>`: Emits the selected item when an item is selected.


## Use the component in your template:

```html
<angular-select-dropdown
  [items]="items"
  [labelHandler]="labelHandler"
  [sortKeyName]="'value'"
  [isClearable]="true"
  [disabled]="false"
  [placeholder]="'Select an item'"
  [closeMenuOnClear]="true"
  [formControl]="control"
  (selectItem)="onSelectItem($event)">
</angular-select-dropdown>
```

## Example Component

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-example',
  templateUrl: './dropdown-example.component.html'
})
export class DropdownExampleComponent {
  items = [
    { value: 1, name: 'Item 1' },
    { value: 2, name: 'Item 2' },
    { value: 3, name: 'Item 3' }
  ];
  // or simple string
  items = [ 'item 1', 'item 2', 'item 3' ];

  labelHandler = (item) => item[yourKey];
  control: FormControl = new FormControl();

  onSelectItem(selectedItem) {
    console.log('Selected Item:', selectedItem);
  }
}
```

## Styling

You can apply custom styles to the dropdown by targeting the `angular-select-dropdown` class in your global styles.

```css
.angular-select-dropdown {
  /* Custom styles for the dropdown */
}
```

## License

This component is open-source and available under the MIT license.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or bug fixes.
