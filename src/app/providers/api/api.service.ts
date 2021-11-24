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

  getSalesAmounth(start, end): Observable<any> {
    return this.http.get(`${this.apiUrl}/services/sales-amounth/${start}/${end}`)
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

  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payments`)
    // return of([
    //   {
    //     success: true,
    //     message: 'all payments.',
    //     payments: [
    //       {
    //         amount: 9990,
    //         state: 'por pagar',
    //         buyOrder: 'CLTBK20211105',
    //         provider: {
    //           firstname: 'Juan',
    //           lastname: 'Perez',
    //         },
    //         client: {
    //           firstname: 'Carlos',
    //           lastname: 'Dominguez',
    //         }
    //       },{
    //         amount: 9990,
    //         state: 'pagado',
    //         buyOrder: 'CLTBK20211105',
    //         provider: {
    //           firstname: 'Juan',
    //           lastname: 'Perez',
    //         },
    //         client: {
    //           firstname: 'Carlos',
    //           lastname: 'Dominguez',
    //         }
    //       },{
    //         amount: 9990,
    //         state: 'cancelado',
    //         buyOrder: 'CLTBK20211105',
    //         provider: {
    //           firstname: 'Juan',
    //           lastname: 'Perez',
    //         },
    //         client: {
    //           firstname: 'Carlos',
    //           lastname: 'Dominguez',
    //         }
    //       },{
    //         amount: 9990,
    //         state: 'por pagar',
    //         buyOrder: 'CLTBK20211105',
    //         provider: {
    //           firstname: 'Juan',
    //           lastname: 'Perez',
    //         },
    //         client: {
    //           firstname: 'Carlos',
    //           lastname: 'Dominguez',
    //         }
    //       },{
    //         amount: 9990,
    //         state: 'reembolsado',
    //         buyOrder: 'CLTBK20211105',
    //         provider: {
    //           firstname: 'Juan',
    //           lastname: 'Perez',
    //         },
    //         client: {
    //           firstname: 'Carlos',
    //           lastname: 'Dominguez',
    //         }
    //       },
    //     ]
    //   }
    // ])
  }

  updatePayment(data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/payments/edit-payment`, data)
  }
}
