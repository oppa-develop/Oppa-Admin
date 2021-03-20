import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';

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
      { name: 'Supercategoría' }
    ],
    rows: []
  };
  loading: boolean = true

  constructor(
    private api: ApiService
  ) { }
  
  ngOnInit() {
    this.api.getServices().toPromise()
      .then((res: any) => {
        this.loading = false
        res.services.forEach(service => {
          this.table.rows.push({
            Título: service.title,
            Descripción: service.description,
            Precio: service.price,
            Esencial: service.isBasic || 'no',
            Categoría: service.category_title,
            Supercategoría: service.super_category_title
          })
        });
      })
  }

}
