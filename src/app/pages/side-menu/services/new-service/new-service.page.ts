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
  btnImageText: string = 'seleccionar imagen'

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
      isBasic: [false, Validators.required],
      state: ['active', Validators.required],
      commission: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  cancel() {
    this.modalController.dismiss();
  }

  createService() {
    if (!this.newServiceForm.valid) throw Error('Invalid Form')
    this.api.createService(this.newServiceForm.value).toPromise()
      .then((res: any) => {
        const index = this.categories.findIndex(category => {
          return category.category_id == this.newServiceForm.value.categories_category_id
        })
        this.newServiceForm.value.category_title = this.categories[index].title
        this.modalController.dismiss(this.newServiceForm.value)
      })
    
  }

  getCategoriesBySupercategoryTitle() {
    this.newServiceForm.value.categories_category_id = ''
    this.api.getCategoriesBySupercategoryTitle(this.newServiceForm.value.super_category_title).toPromise()
      .then((res: any) => {
        if (res.categories.length != 0) this.disableCategories = false
        this.categories = res.categories
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  imageSelected($event) {
    console.log($event);
    
    this.btnImageText = $event.srcElement.files[0].name
    this.newServiceForm.value.image = $event.srcElement.files[0]
  }

}
