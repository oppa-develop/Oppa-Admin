import { Component, OnInit } from '@angular/core';
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
      { name: 'amount' },
      { name: 'state' },
      { name: 'buyOrder' },
      { name: 'provider' },
      { name: 'client' },
      { name: '' }
    ],
    rows: []
  };
  apiUrl: string = environment.HOST + '/'
  loading: boolean = true
  page: number = 0
  totalPages: number

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loading = true
    this.api.getPayments().toPromise()
      .then((res: any) => {
        this.loading = false
        this.table.rows = []
        console.log(res)
        res[0].payments.forEach(payment => {
          this.table.rows.push({
            amount: payment.amount,
            state: payment.state,
            buyOrder: payment.buyOrder,
            provider: payment.provider.firstname + ' ' + payment.provider.lastname,
            client: payment.client.firstname + ' ' + payment.client.lastname
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
}
