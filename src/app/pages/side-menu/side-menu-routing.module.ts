import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { SideMenuPage } from './side-menu.page';

const routes: Routes = [
  {
    path: 'sidemenu',
    component: SideMenuPage,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'new-service',
        loadChildren: () => import('./new-service/new-service.module').then( m => m.NewServicePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/sidemenu/home',
    pathMatch: 'full'
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'new-service',
    loadChildren: () => import('./new-service/new-service.module').then( m => m.NewServicePageModule)
  },
  {
    path: 'new-category',
    loadChildren: () => import('./new-category/new-category.module').then( m => m.NewCategoryPageModule)
  },
  {
    path: 'new-user',
    loadChildren: () => import('./new-user/new-user.module').then( m => m.NewUserPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
