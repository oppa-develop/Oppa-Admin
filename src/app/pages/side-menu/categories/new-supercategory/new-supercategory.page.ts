import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-new-supercategory',
  templateUrl: './new-supercategory.page.html',
  styleUrls: ['./new-supercategory.page.scss'],
})
export class NewSupercategoryPage implements OnInit {

  newSupercategoryForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.newSupercategoryForm = this.createNewSupercategoryForm()
  }

  createNewSupercategoryForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  cancel() {
    this.modalController.dismiss();
  }

  async createSupercategory() {
    if (!this.newSupercategoryForm.valid) throw Error('Invalid Form')
    const loading = await this.loadingController.create({
      message: 'Creando super categoría...'
    });
    await loading.present()
    this.api.createSupercategory(this.newSupercategoryForm.value).toPromise()
      .then((res: any) => {
        loading.dismiss()
        this.modalController.dismiss(this.newSupercategoryForm.value)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      })
  }

}
