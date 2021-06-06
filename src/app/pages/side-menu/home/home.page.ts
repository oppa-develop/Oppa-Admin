import { Component } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { environment } from 'src/environments/environment';
import { Chart } from 'angular-highcharts';

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
  mostActiveDistrictsChart: Chart

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
        this.generateChart({ categories: res.districts.map(district => district.district) })
        let data = []
        for (let i = 0; i < res.districts.length; i++) {
          data.push({
            x: i,
            y: res.districts[i].servicesCount,
            name: `${res.districts[i].district}, región ${res.districts[i].region}`
          })
        }
        console.table(data)
        this.mostActiveDistrictsChart.addSeries({
          data,
          title: undefined
        } as any, true, true);
      })

  }

  generateChart(data) {
    this.mostActiveDistrictsChart = new Chart({
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        height: '40%'
      },
      title: {
        text: undefined
      },
      xAxis: {
        categories: data.categories
      },
      yAxis: {
        title: undefined
      },
      legend: {
          enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          name: 'Servicios solicitados',
          borderColor: 'transparent',
          borderRadius: 5,
          color: '#38b1f9'
        }
      }
    } as any);
  }
}
