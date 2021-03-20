import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { environment } from 'src/environments/environment';

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
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getCategories().toPromise()
      .then((res: any) => {
        res.categories.forEach(category => {
          this.loadingCategories = false
          this.categoriesTable.rows.push({
            Título: category.title,
            Descripción: category.description,
            Supercategoría: category.super_category,
          })
        });
      })
    this.api.getSupercategories().toPromise()
      .then((res: any) => {
        res.superCategories.forEach(superCategory => {
          this.loadingSupercategories = false
          this.superCategoriesTable.rows.push({
            Título: superCategory.title,
            Descripción: superCategory.description,
          })
        });
      })
  }

}
