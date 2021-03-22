import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.page.html',
  styleUrls: ['./new-service.page.scss'],
})
export class NewServicePage implements OnInit {

  newServiceForm: FormGroup
  categories = []
  superCategories = []
  disableCategories: boolean = true

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.newServiceForm = this.createNewServiceForm()
    this.api.getSupercategories().toPromise()
      .then((res: any) => {
        this.superCategories = res.superCategories
      })
  }

  createNewServiceForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      categories_category_id: ['', Validators.required],
      super_category_title: ['', Validators.required],
      isBasic: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  cancel() {
    this.modalController.dismiss();
  }

  createService() {
    if (!this.newServiceForm.valid) throw Error('Invalid Form')
    /* this.api.createService(this.newServiceForm.value).toPromise()
      .then((res: any) => {
        const index = this.superCategories.findIndex(superCategory => {
          return superCategory.super_category_id == this.newServiceForm.value.super_categories_super_category_id
        })
        delete this.newServiceForm.value.super_categories_super_category_id
        this.newServiceForm.value.super_category = this.superCategories[index].title
        this.modalController.dismiss(this.newServiceForm.value)
      }) */    
    this.modalController.dismiss(this.newServiceForm.value)
  }

  getCategoriesBySupercategoryTitle() {
    console.log('work');
    this.newServiceForm.value.categories_category_id = ''
    this.api.getCategoriesBySupercategoryTitle(this.newServiceForm.value.super_category_title).toPromise()
      .then((res: any) => {
        if (res.categories.length != 0) this.disableCategories = false
        console.log(res, res.categories.length);
        this.categories = res.categories
      })
  }

}
