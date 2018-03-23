import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule { }
