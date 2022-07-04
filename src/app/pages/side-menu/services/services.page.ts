import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';
import { NewServicePage } from './new-service/new-service.page';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss']
})
export class ServicesPage implements OnInit {

  public table: any = {
    columns: [
      { name: 'Título' },
      { name: 'Descripción' },
      { name: 'Precio' },
      { name: 'Esencial' },
      { name: 'Categoría' },
      { name: 'Supercategoría' },
      { name: 'Comisión (%)' }
    ],
    rows: []
  };
  loading: boolean = true
  page: number = 0
  totalPages: number

  constructor(
    private api: ApiService,
    public toastCtrl: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loading = true
    this.api.getServices().toPromise()
      .then((res: any) => {
        this.loading = false
        this.table.rows = []
        res.services.forEach(service => {
          if (service.state !== 'eliminado por admin') this.table.rows.push({
            Título: service.title,
            Descripción: service.description,
            Precio: service.price,
            Esencial: service.isBasic || 'no',
            Categoría: service.category_title,
            Supercategoría: service.super_category_title,
            'Comisión (%)': service.commission,
            Estado: service.state,
            Id: service.service_id
          })
        });
        this.totalPages = Math.ceil(this.table.rows.length / 5)
      })
  }

  nextPage() {
    if (this.page < Math.ceil(this.table.rows.length / 5)) this.page++
  }

  previousPage() {
    if (this.page > 0) this.page--
  }

  async presentModalNewService() {
    const modal = await this.modalController.create({
      component: NewServicePage,
      cssClass: 'modal-form-large'
    });

    modal.onDidDismiss()
      .then((newService) => {
        if (newService.data) this.table.rows.push({
          Título: newService.data.title,
          Descripción: newService.data.description,
          Precio: newService.data.price,
          Esencial: newService.data.isBasic,
          Categoría: newService.data.category_title,
          Supercategoría: newService.data.super_category_title
        })
      });

    return await modal.present();
  }

  changeState(service_id: number, state: string) {
    this.api.changeServiceState({ service_id, state }).toPromise()
      .then(res => {
        let row = this.table.rows.find(row => row.Id === service_id)
        row.state = state
        this.table.rows = this.table.rows.filter(row => row.state !== 'eliminado por admin')
        this.totalPages = Math.ceil(this.table.rows.length / 5)
        this.presentToast('Servicio eliminado correctamente.', 'success')
      })
      .catch(err => {
        this.presentToast('No se pudo eliminar el servicio. Intente nuevamente.', 'danger')
      })
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

}
