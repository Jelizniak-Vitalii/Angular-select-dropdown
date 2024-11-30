import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly control: FormControl = new FormControl<any>(null);

  items: any = [
    { value: 1, name: 'Test 1 ' },
    { value: 2, name: 'Test 2' },
    { value: 3, name: 'Test 3' },
    { value: 4, name: 'Test 4' },
    { value: 5, name: 'Test 5' },
    { value: 6, name: 'Test 6' }
  ];
}
