import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular/umd';
import { Venta } from '../../models/venta.modelo';
import { VentaProvider } from '../../providers/ventaProvider/ventaPeovider';
import { VentaTotal } from '../../models/ventaTotal.modelo';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../models/usuario.modelo';
import { UsuariosProvider } from '../../providers/usuarios/usuarioProvider';
import { Empleado } from '../../models/empleado.modelo';
import { Comision } from '../../models/comision.modelo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class InicioPage {

  cearUsuarioPage = "UsuarioCrearPage";
  venta: Array<Venta> = [];
  totales: VentaTotal = null;
  comisiones: Comision = null;

  per = undefined;

  usarioId: number;
  public totalVenta: number;
  public totalComision: number;

  us: Usuario = null;
  constructor(
    public navCtrl: NavController,
    private ventaProvdier: VentaProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private usuarioProvider: UsuariosProvider,
    public storage: Storage
  ) {

    this.comprobarSesion();
    this.idEmpleado();
  }

  idEmpleado() {
    this.storage.get('id').then((val) => {
      this.usarioId = val;
      this.usuarioPorId(val);
      console.log(val);
    });
  }

  comprobarSesion() {
    this.storage.get('id').then((val) => {
      this.usarioId = val;
      if (this.usarioId == null || this.usarioId == undefined) {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Debe estar logueado',
          buttons: [{
            text: "OK",
            handler: data => {
              this.navCtrl.setRoot(LoginPage);
            }
          }]
        });
        alert.present();
      } else {
        console.log('ingesado');
      }
    });

  }

  usuarioPorId(id: number): Usuario {
    this.usuarioProvider.usuarioPorId(id).subscribe(data => {
      this.us = data;
      var empleadoId: Empleado;
      empleadoId = JSON.parse(JSON.stringify(this.us.empleadoId));

      console.log(empleadoId);
      this.mostrarVentas(Number(empleadoId.id));
      this.mostrarComisiones(Number(empleadoId.id));
    }, error => {
      console.log(error);
      return null;
    });
    return null;

  }

  mostrarVentas(id: number) {
    //console.log(this.idU);
    this.ventaProvdier.ventaTotal(id).subscribe(data => {
      this.totales = data;
      console.log(this.totales.ventaTotal);
      this.totalVenta = this.totales.ventaTotal;

    }, error => {
      console.log(error);
    });
  }

  mostrarComisiones(id: number) {
    //console.log(this.idU);
    this.ventaProvdier.comisionTotal(id).subscribe(data => {
      this.comisiones = data;
      console.log(this.comisiones.comision);
      this.totalComision = this.comisiones.comision;

    }, error => {
      console.log(error);
    });
  }


  listarP() {
    this.ventaProvdier.listarVentas().subscribe(data => {
      this.venta = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }


}
