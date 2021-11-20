import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';
import { environment } from 'src/environments/environment';
import { NewCategoryPage } from './new-category/new-category.page';
import { NewSupercategoryPage } from './new-supercategory/new-supercategory.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public categoriesTable: any = {
    columns: [
      { name: 'Título' },
      { name: 'Descripción' },
      { name: 'Supercategoría' }
    ],
    rows: []
  };
  public superCategoriesTable: any = {
    columns: [
      { name: 'Título' },
      { name: 'Descripción' }
    ],
    rows: []
  };
  apiUrl: string = environment.HOST + '/'
  loadingCategories: boolean = true
  loadingSupercategories: boolean = true

  constructor(
    private api: ApiService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingCategories = true
    this.loadingSupercategories = true
    this.api.getCategories().toPromise()
      .then((res: any) => {
        this.loadingCategories = false
        this.categoriesTable.rows = []
        res.categories.forEach(category => {
          this.categoriesTable.rows.push({
            Título: category.title,
            Descripción: category.description,
            Supercategoría: category.super_category,
          })
        });
      })
    this.api.getSupercategories().toPromise()
      .then((res: any) => {
        this.loadingSupercategories = false
        this.superCategoriesTable.rows = []
        res.superCategories.forEach(superCategory => {
          this.superCategoriesTable.rows.push({
            Título: superCategory.title,
            Descripción: superCategory.description,
          })
        });
      })
  }

  async presentModalNewCategory() {
    const modal = await this.modalController.create({
      component: NewCategoryPage,
      cssClass: 'modal-form'
    });

    modal.onDidDismiss()
      .then((newCategory) => {
        if (newCategory.data) this.categoriesTable.rows.push({
          Título: newCategory.data.title,
          Descripción: newCategory.data.description,
          Supercategoría: newCategory.data.super_category,
        })
      });

    return await modal.present();
  }

  async presentModalNewSupercategory() {
    const modal = await this.modalController.create({
      component: NewSupercategoryPage,
      cssClass: 'modal-form'
    });

    modal.onDidDismiss()
      .then((newSupercategory) => {
        if (newSupercategory.data) this.superCategoriesTable.rows.push({
          Título: newSupercategory.data.title,
          Descripción: newSupercategory.data.description
        })
      });

    return await modal.present();
  }

}
