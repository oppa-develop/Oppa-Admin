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

  createSupercategory() {
    if (!this.newSupercategoryForm.valid) throw Error('Invalid Form')
    this.api.createCategory(this.newSupercategoryForm.value).toPromise()
      .then((res: any) => {
        this.modalController.dismiss(this.newSupercategoryForm.value)
      })
  }

}
