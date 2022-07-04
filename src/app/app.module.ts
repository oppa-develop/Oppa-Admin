import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './providers/api/api.service';
import { AuthService } from './providers/auth/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxElectronModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    ApiService,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
