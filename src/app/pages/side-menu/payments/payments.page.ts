import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  public table: any = {
    columns: [
      { name: 'Monto' },
      { name: 'Estado' },
      { name: 'Nº de Orden' },
      { name: 'Proveedor' },
      { name: 'Cliente' },
      { name: 'Servicio' },
      { name: '' }
    ],
    rows: []
  };
  apiUrl: string = environment.HOST + '/'
  loading: boolean = true
  page: number = 0
  totalPages: number

  constructor(
    private api: ApiService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loading = true
    this.api.getPayments().toPromise()
      .then((res: any) => {
        this.loading = false
        this.table.rows = []
        res.payments.forEach(payment => {
          this.table.rows.push({
            'Monto': payment.amount,
            'Estado': payment.state,
            'Nº de Orden': payment.buyOrder,
            'Proveedor': payment.provider.firstname + ' ' + payment.provider.lastname,
            'Cliente': payment.client.firstname + ' ' + payment.client.lastname,
            'Servicio': payment.service.title,
            'id': payment.payment_id
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

  async changeState(payment_id) {
    const payment = this.table.rows.find(payment => payment.id == payment_id)
    console.log({payment}, payment_id)
    let newState = payment['Estado']
    const alert = await this.alertController.create({
      header: 'Estado del pago',
      inputs: [
        {
          type: 'radio',
          label: 'Pagado',
          handler: () => {
            newState = 'Pagado'
          },
          checked: (payment['Estado'].toLowerCase() === 'pagado') ? true : false
        },
        {
          type: 'radio',
          label: 'Por pagar',
          handler: () => {
            newState = 'Por pagar'
          },
          checked: (payment['Estado'].toLowerCase() === 'por pagar') ? true : false
        },
        {
          type: 'radio',
          label: 'Cancelado',
          handler: () => {
            newState = 'Cancelado'
          },
          checked: (payment['Estado'].toLowerCase() === 'cancelado') ? true : false
        },
        {
          type: 'radio',
          label: 'Reembolsado',
          handler: () => {
            newState = 'Reembolsado'
          },
          checked: (payment['Estado'].toLowerCase() === 'reembolsado') ? true : false
        },
        {
          type: 'radio',
          label: 'En proceso',
          handler: () => {
            newState = 'En proceso'
          },
          checked: (payment['Estado'].toLowerCase() === 'en proce') ? true : false
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.api.updatePayment({payment_id, state: newState}).toPromise()
            this.table.rows.find(payment => payment.id == payment_id).Estado = newState
          }
        }
      ]
    });

    await alert.present();
  }
}
