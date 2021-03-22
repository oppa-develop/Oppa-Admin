import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public table: any = {
    columns: [
      { name: '' },
      { name: 'Nombre' },
      { name: 'Género' },
      { name: 'Rut' },
      { name: 'Email' },
      { name: 'Teléfono' },
      { name: 'Fecha de Nacimiento' }
    ],
    rows: []
  };
  apiUrl: string = environment.HOST + '/'
  loading: boolean = true

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loading = true
    this.api.getUsers().toPromise()
      .then((res: any) => {
        this.loading = false
        this.table.rows = []
        res.users.forEach(user => {
          this.table.rows.push({
            img_url: user.img_url,
            Nombre: user.firstname +  ' ' + user.lastname,
            Género: user.gender,
            Rut: user.rut,
            Email: user.email,
            Teléfono: user.phone,
            "Fecha de Nacimiento": user.birthdate,
          })
        });
      })
  }

}
