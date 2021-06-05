import { Component } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public lastServicesTable: any = {
    columns: [
      { name: 'Servicio' },
      { name: 'Categoría' },
      { name: 'Supercategoría' },
      { name: 'Proveedor' },
      { name: 'Cliente' },
      { name: 'Estado' }
    ],
    rows: [
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado' },
    ]
  };
  apiUrl: string = environment.HOST + '/'
  loadingServices: boolean = true

  constructor(
    private api: ApiService
  ) { }

  ionViewWillEnter() {
    this.loadingServices = true
    setTimeout(() => {
      this.loadingServices = false
    }, 1000)
    /* this.api.getServices().toPromise()
      .then((res: any) => {
        this.loadingServices = false
        this.lastServicesTable.rows = []
        res.services.forEach(service => {
          this.lastServicesTable.rows.push({
            Servicio: service.title,
            Categoría: service.category,
            Supercategoría: service.super_category,
            Proveedor: service.super_category,
            Cliente: service.super_category,
          })
        });
      }) */
  }

}
