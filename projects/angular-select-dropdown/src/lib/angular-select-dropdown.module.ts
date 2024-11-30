import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSelectDropdownComponent } from './components';
import { ClickOutsideDirective } from './directives';

@NgModule({
  declarations: [ AngularSelectDropdownComponent, ClickOutsideDirective ],
  imports: [CommonModule],
  exports: [ AngularSelectDropdownComponent ]
})
export class AngularSelectDropdownModule {}
