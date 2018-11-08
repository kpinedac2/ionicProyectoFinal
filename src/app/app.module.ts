import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular/umd';

import { MyApp } from './app.component';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosProvider } from '../providers/usuarios/usuarioProvider';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from '../pages/login/login';
import { VentasPage } from '../pages/ventas/ventas';
import { ProductoProvider } from '../providers/producto/producto';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsuarioCrearPage } from '../pages/usuario-crear/usuario-crear';
import { IonicStorageModule } from '@ionic/storage';
import { VentaProvider } from '../providers/ventaProvider/ventaPeovider';
import { VentaDetallePage } from '../pages/venta-detalle/venta-detalle';
import { FacturaPage } from '../pages/factura/factura';
import { InicioPage } from '../pages/inicio/inicio';

@NgModule({
  declarations: [
    MyApp,
    InicioPage,
    ListPage,
    LoginPage,
    VentasPage,
    UsuarioCrearPage,
    VentaDetallePage,
    FacturaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage,
    ListPage,
    LoginPage,
    VentasPage,
    UsuarioCrearPage,
    VentaDetallePage,
    FacturaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuariosProvider,
    ProductoProvider,
    VentaProvider,
    
  ]
})
export class AppModule {}
