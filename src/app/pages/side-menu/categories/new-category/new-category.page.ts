import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private api: ApiService
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

  createCategory() {
    if (!this.newCategoryForm.valid) throw Error('Invalid Form')
    this.api.createCategory(this.newCategoryForm.value).toPromise()
      .then((res: any) => {
        const index = this.superCategories.findIndex(superCategory => {
          return superCategory.super_category_id == this.newCategoryForm.value.super_categories_super_category_id
        })
        delete this.newCategoryForm.value.super_categories_super_category_id
        this.newCategoryForm.value.super_category = this.superCategories[index].title
        this.modalController.dismiss(this.newCategoryForm.value)
      })
  }

}
