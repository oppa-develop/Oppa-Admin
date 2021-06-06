import { Component, ElementRef, ViewChild } from '@angular/core';
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
      { name: 'Estado' },
      { name: 'Fecha' }
    ],
    rows: [
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado', Fecha: new Date() },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'terminado', Fecha: new Date() },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado', Fecha: new Date() },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'agendado', Fecha: new Date() },
      { Servicio: 'Corte de Pelo', Categoría: 'Peluquería', Supercategoría: 'Servicio a Domicilio', Proveedor: 'Carlos Rodríguez', Cliente: 'Patricia Lagos', Estado: 'Cancelado', Fecha: new Date() },
    ]
  };
  public districtsTable: any = {
    columns: [
      { name: 'Comuna' },
      { name: 'Región' },
      { name: 'Nº Servicios' }
    ],
    rows: [
      { 'Comuna': 'Recoleta', 'Región': 'Metropolitana de Santiago', 'Nº Servicios': 20 },
      { 'Comuna': 'Conchalí', 'Región': 'Metropolitana de Santiago', 'Nº Servicios': 10 },
      { 'Comuna': 'Providencia', 'Región': 'Metropolitana de Santiago', 'Nº Servicios': 20 },
      { 'Comuna': 'Vitacura', 'Región': 'Metropolitana de Santiago', 'Nº Servicios': 40 },
      { 'Comuna': 'Huechuraba', 'Región': 'Metropolitana de Santiago', 'Nº Servicios': 80 },
    ]
  };

  apiUrl: string = environment.HOST + '/'
  loadingServices: boolean = true
  loadingMostActiveDistricts: boolean = true

  usersChart = {}
  providersChart = {}
  mostActiveDistrictsChart = {}

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
    this.api.getMostActiveDistricts().toPromise()
      .then((res: any) => {
        this.loadingMostActiveDistricts = false
        console.table(res.districts)
      })
  }
}
