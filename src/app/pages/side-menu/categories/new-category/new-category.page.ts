import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
})
export class NewCategoryPage implements OnInit {

  superCategories = []
  newCategoryForm: FormGroup

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.newCategoryForm = this.createNewCategoryForm()
    this.api.getSupercategories().toPromise()
      .then((res: any) => {
        this.superCategories = res.superCategories
      })
  }

  createNewCategoryForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      super_categories_super_category_id: ['', Validators.required]
    })
  }

  cancel() {
    this.modalController.dismiss();
  }

  async createCategory() {
    if (!this.newCategoryForm.valid) throw Error('Invalid Form')
    const loading = await this.loadingController.create({
      message: 'Creando categoría...'
    });
    await loading.present()
    this.api.createCategory(this.newCategoryForm.value).toPromise()
      .then((res: any) => {
        loading.dismiss()
        const index = this.superCategories.findIndex(superCategory => {
          return superCategory.super_category_id == this.newCategoryForm.value.super_categories_super_category_id
        })
        delete this.newCategoryForm.value.super_categories_super_category_id
        this.newCategoryForm.value.super_category = this.superCategories[index].title
        this.modalController.dismiss(this.newCategoryForm.value)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      })
  }

}
