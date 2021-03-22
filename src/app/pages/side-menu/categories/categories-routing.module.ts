import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: 'new-category',
    loadChildren: () => import('./new-category/new-category.module').then( m => m.NewCategoryPageModule)
  },
  {
    path: 'new-superCategory',
    loadChildren: () => import('./new-superCategory/new-superCategory.module').then( m => m.NewSupercategoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
