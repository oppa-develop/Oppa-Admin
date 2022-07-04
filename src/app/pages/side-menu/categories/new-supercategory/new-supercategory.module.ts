import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSupercategoryPageRoutingModule } from './new-supercategory-routing.module';

import { NewSupercategoryPage } from './new-supercategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSupercategoryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewSupercategoryPage]
})
export class NewSupercategoryPageModule {}
