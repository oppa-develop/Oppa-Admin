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

  apiUrl: string = environment.HOST + '/'
  loadingServices: boolean = true
  loadingMostActiveDistricts: boolean = true
  page: number = 0
  totalPages: number

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
  salesPerDay = {
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
        this.generateMostActiveDistrictsChart(res.districts)
      })

    this.api.getSalesPerDay().toPromise()
      .then((res: any) => {
        this.generateSalesPerDayChart(res.sales)
      })

    this.api.getMonthlySales().toPromise()
      .then((res: any) => {
        this.generateMonthlySalesChart(res.sales)
      })

    this.api.getNewUsers().toPromise()
      .then((res: any) => {
        this.generateNewUsersChart(res.users)
      })

    this.api.getNewProviders().toPromise()
      .then((res: any) => {
        this.generateNewProvidersChart(res.providers)
      })

    this.api.getLastServicesRequested().toPromise()
      .then((res: any) => {
        res.lastServicesRequested = res.lastServicesRequested.map(service => {
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

        this.lastServicesTable.rows = res.lastServicesRequested
        this.totalPages = Math.ceil(this.lastServicesTable.rows.length/5)
      })

  }

  nextPage() {
    if (this.page < Math.ceil(this.lastServicesTable.rows.length/5)) this.page++
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
        height: '40%'
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
        y: districts[i].servicesCount,
        name: `${districts[i].district}, región ${districts[i].region}`
      })
    }
    this.mostActiveDistricts.chart.addSeries({
      data,
      title: undefined
    } as any, true, true);
  }

  generateSalesPerDayChart(data) {
    this.salesPerDay.percentage = (data.value * 100) / data.totalValue
    this.salesPerDay.totalValue = data.totalValue
    this.salesPerDay.value = data.value
    this.salesPerDay.chart = new Chart({
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
          y: this.salesPerDay.percentage
        }]
      }]
    } as any);
  }

  generateMonthlySalesChart(data) {
    this.totalSales.percentage = (data.value * 100) / data.totalValue
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
          color: '#2dd36f',
          radius: '112%',
          innerRadius: '88%',
          y: this.totalSales.percentage
        }]
      }]
    } as any);
  }

  generateNewUsersChart(data) {
    this.newUsers.percentage = (data.value * 100) / data.totalValue
    this.newUsers.totalValue = data.totalValue
    this.newUsers.value = data.value
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
    this.newProviders.percentage = (data.value * 100) / data.totalValue
    this.newProviders.totalValue = data.totalValue
    this.newProviders.value = data.value
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
