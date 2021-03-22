import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Service } from 'src/app/models/service';

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
}
