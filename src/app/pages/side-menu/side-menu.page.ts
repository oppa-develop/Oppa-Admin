import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  pages = [
    { title: 'Inicio',      icon: 'home',       url: '/sidemenu/home'},
    { title: 'Categorias',  icon: 'reader',     url: '/sidemenu/categories'},
    { title: 'Servicios',   icon: 'construct',  url: '/sidemenu/services'},
    { title: 'Usuarios',    icon: 'person',     url: '/sidemenu/users'},
  ]
  user: User;
  apiUrl: string = environment.HOST + '/'

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
  }

  logout() {
    this.auth.logout()
  }

}
