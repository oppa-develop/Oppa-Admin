import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Service } from 'src/app/models/service';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = environment.HOST + '/api'

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/auth/login-client', { email, password });
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`)
  }

  getCategoriesBySupercategoryTitle(title: string): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/categories/super_category_title/${title}`)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`)
  }

  getSupercategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/superCategories`)
  }

  createCategory(newCategory): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/new-category`, newCategory)
  }

  createSupercategory(newSupercategory): Observable<any> {
    return this.http.post(`${this.apiUrl}/superCategories/new-super-category`, newSupercategory)
  }

  createService(newService) {
    let formData = serialize(newService)
    console.log(formData);
    return this.http.post(`${this.apiUrl}/services/new-service`, formData)
  }

  getMostActiveDistricts() {
    return of({
      success: true,
      message: 'most active districts of the month',
      districts: [
        { district: 'Recoleta',     region: 'Metropolitana de Santiago', servicesCount: 100 },
        { district: 'Conchalí',     region: 'Metropolitana de Santiago', servicesCount: 50 },
        { district: 'Providencia',  region: 'Metropolitana de Santiago', servicesCount: 0 },
        { district: 'Vitacura',     region: 'Metropolitana de Santiago', servicesCount: 70 },
        { district: 'Huechuraba',   region: 'Metropolitana de Santiago', servicesCount: 20 }
      ]
    })
  }

  getSalesPerDay() {
    return of({
      success: true,
      message: 'most active districts of the month',
      sales: { date: new Date(), value: Math.ceil(Math.random() * 1000), totalValue: Math.ceil(Math.random() * 100000) }
    })
  }

  getMonthlySales() {
    return of({
      success: true,
      message: 'most active districts of the month',
      sales: { date: new Date(), value: Math.ceil(Math.random() * 1000),  totalValue: Math.ceil(Math.random() * 100000) }
    })
  }

  getNewUsers() {
    return of({
      success: true,
      message: 'most active districts of the month',
      users: { date: new Date(), value: Math.ceil(Math.random() * 10),  totalValue: Math.ceil(Math.random() * 100) }
    })
  }

  getNewProviders() {
    return of({
      success: true,
      message: 'most active districts of the month',
      providers: { date: new Date(), value: Math.ceil(Math.random() * 10),  totalValue: Math.ceil(Math.random() * 100) }
    })
  }

  getLastServicesRequested(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/LastRequested`)
  }

  getMostRequestedServices(limit: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/MostRequested/limit/${limit}`)
  }

  getMostRequestedDistricts(limit: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/addresses/MostRequested/limit/${limit}`)
  }

  getQuanitityOfClients(start: string, end: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/clients/quantity/${start}/${end}`)
  }

  getQuanitityOfProviders(start: string, end: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/providers/quantity/${start}/${end}`)
  }
}
