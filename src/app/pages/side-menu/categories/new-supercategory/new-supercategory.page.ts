import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-new-supercategory',
  templateUrl: './new-supercategory.page.html',
  styleUrls: ['./new-supercategory.page.scss'],
})
export class NewSupercategoryPage implements OnInit {

  newSupercategoryForm: FormGroup

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.newSupercategoryForm = this.createNewSupercategoryForm()
    console.log(this.newSupercategoryForm.value)
  }

  createNewSupercategoryForm() {
    return this.formBuilder.group({
      title: ['Servicios de Acompañamiento', Validators.required],
      description: ['Servicios que se realizan fuera del hogar del cliente', Validators.required]
    })
  }

  cancel() {
    this.modalController.dismiss();
  }

  createSupercategory() {
    if (!this.newSupercategoryForm.valid) throw Error('Invalid Form')
    console.log(this.newSupercategoryForm.value)
    this.api.createSupercategory(this.newSupercategoryForm.value).toPromise()
      .then((res: any) => {
        this.modalController.dismiss(this.newSupercategoryForm.value)
      })
  }

}
