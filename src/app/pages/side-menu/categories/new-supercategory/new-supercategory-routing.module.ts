import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSupercategoryPage } from './new-supercategory.page';

const routes: Routes = [
  {
    path: '',
    component: NewSupercategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSupercategoryPageRoutingModule {}
