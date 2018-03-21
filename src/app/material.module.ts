import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material';

const MODULES = [
  MatButtonModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule { }
