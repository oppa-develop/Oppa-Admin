import { Component } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { environment } from 'src/environments/environment';
import { Chart } from 'angular-highcharts';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apiUrl: string = environment.HOST + '/'
  loadingServices: boolean = true
  loadingMostActiveDistricts: boolean = true
  page: number = 0
  totalPages: number
  mostRequestedServices: any[] = []

  // tablas
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

  // gráficos
  newUsers = {
    chart: undefined,
    percentage: 0,
    value: 0,
    totalValue: 0
  }
  newProviders = {
    chart: undefined,
    percentage: 0,
    value: 0,
    totalValue: 0
  }
  mostActiveDistricts = {
    chart: undefined,
    categories: []
  }
  totalServices = {
    chart: undefined,
    percentage: 0,
    value: 0,
    totalValue: 0
  }
  totalSales = {
    chart: undefined,
    percentage: 0,
    value: 0,
    totalValue: 0
  }

  constructor(
    private api: ApiService
  ) { }

  ionViewWillEnter() {

    this.api.getLastServicesRequested().toPromise()
      .then((res: any) => {
        this.loadingServices = false
        this.lastServicesTable.rows = res.lastServicesRequested.map(service => {
          return {
            Servicio: service.service,
            Categoría: service.category,
            Supercategoría: service.super_category,
            Proveedor: service.provider,
            Cliente: service.client,
            Estado: service.state,
            Fecha: service.date
          }
        })
        
        this.totalPages = Math.ceil(this.lastServicesTable.rows.length / 5)

        this.generateServicesChart({
          value: this.lastServicesTable.rows.filter(service => service.Estado !== 'cancelado').length,
          totalValue: this.lastServicesTable.rows.length
        })
      })

    this.api.getMostRequestedServices(5).toPromise()
      .then((res: any) => {
        this.mostRequestedServices = res.mostRequestedServices
      })
    this.api.getMostRequestedDistricts(5).toPromise()
      .then((res: any) => {
        this.loadingMostActiveDistricts = false
        this.generateMostActiveDistrictsChart(res.mostRequestedDistricts)
      })
    this.api.getQuanitityOfClients(dayjs().date(1).format('YYYY-MM-DD'), dayjs().date(31).format('YYYY-MM-DD')).toPromise()
      .then((res: any) => {
        this.generateNewUsersChart(res.data)
      })
    this.api.getQuanitityOfProviders(dayjs().date(1).format('YYYY-MM-DD'), dayjs().date(31).format('YYYY-MM-DD')).toPromise()
      .then((res: any) => {
        this.generateNewProvidersChart(res.data)
      })
  }

  nextPage() {
    if (this.page < Math.ceil(this.lastServicesTable.rows.length / 5)) this.page++
  }

  previousPage() {
    if (this.page > 0) this.page--
  }

  generateMostActiveDistrictsChart(districts) {
    this.mostActiveDistricts.categories = districts.map(district => district.district)
    this.mostActiveDistricts.chart = new Chart({
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        height: '36%'
      },
      title: {
        text: undefined
      },
      xAxis: {
        categories: this.mostActiveDistricts.categories
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
    let data = []
    for (let i = 0; i < districts.length; i++) {
      data.push({
        x: i,
        y: districts[i].quantity,
        name: `${districts[i].district}, región ${districts[i].region}`
      })
    }
    this.mostActiveDistricts.chart.addSeries({
      data,
      title: undefined
    } as any, true, true);
  }

  generateSalesChart(data) {
    this.totalSales.percentage = ((data.value * 100) / data.totalValue) || 0
    this.totalSales.totalValue = data.totalValue
    this.totalSales.value = data.value
    this.totalSales.chart = new Chart({
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent',
        height: '70%',
        margin: [0, 0, 0, -30]
      },

      title: {
        text: undefined
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        pointFormat: ''
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: '#343c54',
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          stickyTracking: false,
          rounded: true
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        name: 'Move',
        data: [{
          color: '#3aabf8',
          radius: '112%',
          innerRadius: '88%',
          y: this.totalSales.percentage
        }]
      }]
    } as any);
  }

  generateServicesChart(data) {
    this.totalServices.percentage = ((data.value * 100) / data.totalValue) || 0
    this.totalServices.totalValue = data.totalValue
    this.totalServices.value = data.value
    this.totalServices.chart = new Chart({
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent',
        height: '70%',
        margin: [0, 0, 0, -30]
      },

      title: {
        text: undefined
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        pointFormat: ''
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: '#343c54',
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          stickyTracking: false,
          rounded: true
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        name: 'Move',
        data: [{
          color: '#2dd36f',
          radius: '112%',
          innerRadius: '88%',
          y: this.totalServices.percentage
        }]
      }]
    } as any);
  }

  generateNewUsersChart(data) {
    this.newUsers.percentage = (data.quantity * 100) / data.total
    this.newUsers.totalValue = data.total
    this.newUsers.value = data.quantity
    this.newUsers.chart = new Chart({
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent',
        height: '70%',
        margin: [0, 0, 0, -30]
      },

      title: {
        text: undefined
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        pointFormat: ''
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: '#343c54',
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          stickyTracking: false,
          rounded: true
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        name: 'Move',
        data: [{
          color: '#e91e63',
          radius: '112%',
          innerRadius: '88%',
          y: this.newUsers.percentage
        }]
      }]
    } as any);
  }

  generateNewProvidersChart(data) {
    this.newProviders.percentage = (data.quantity * 100) / data.total
    this.newProviders.totalValue = data.total
    this.newProviders.value = data.quantity
    this.newProviders.chart = new Chart({
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent',
        height: '70%',
        margin: [0, 0, 0, -30]
      },

      title: {
        text: undefined
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        pointFormat: ''
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: '#343c54',
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          stickyTracking: false,
          rounded: true
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        name: 'Move',
        data: [{
          color: '#ffc409',
          radius: '112%',
          innerRadius: '88%',
          y: this.newProviders.percentage
        }]
      }]
    } as any);
  }
}
