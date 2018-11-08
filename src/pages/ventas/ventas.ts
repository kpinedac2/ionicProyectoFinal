import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular/umd';
import { Producto } from '../../models/producto.modelo';
import { ProductoProvider } from '../../providers/producto/producto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VentaTipo } from '../../models/ventatipo.modelo';
import { Cliente } from '../../models/cliente.modeo';
import { Usuario } from '../../models/usuario.modelo';
import { UsuariosProvider } from '../../providers/usuarios/usuarioProvider';
import { VentaProvider } from '../../providers/ventaProvider/ventaPeovider';
import { Storage } from '@ionic/storage';
import { Venta } from '../../models/venta.modelo';
import { VentaDetallePage } from '../venta-detalle/venta-detalle';


@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

  searchQuery: string = '';
  items: string[];
  productos: Array<Producto> = [];
  ventaTipos: Array<VentaTipo> = [];
  clientes: Array<Cliente> = [];
  usuarios: Array<Usuario> =[];
  ventaHecha: Venta = null;

  public usarioId: number;

  rows = [];

  tablestyle = 'bootstrap';
  formulario: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productoProvider: ProductoProvider,
    private ventaProvider: VentaProvider,
    private fb: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.storage.remove('venta_id');
    this.initializeItems();
    this.formulario = this.fb.group({
      ventaTotal: 0,
      venta_tipo_id: '',
      cliente_id: '',
      usuario_id: ''
    });
    this.idUsuario();
  }

  idUsuario(){
    this.storage.get('id').then((val) => {
      this.usarioId = val;
    });
  }

  crearVenta() {
    console.log(this.formulario.value);
    this.ventaProvider.vender(this.formulario.value).subscribe(data => {
      this.ventaHecha = data;
      //console.log(this.ventaHecha.id);
      this.navCtrl.setRoot(VentaDetallePage, {idVenta: this.ventaHecha.id})
    }, error => {
      console.log(error);
    })
  }

  mostrar() {
    this.storage.get('venta_id').then((val) => {
      console.log(val); 
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VentasPage');
  }

  initializeItems() {
    this.listarTipoVenta();
    this.listarClientes();
  }

  listarP() {
    this.productoProvider.listarProductos().subscribe(data => {
      this.productos = data;
    }, error => {
      console.log(error);
    });
  }

  listarTipoVenta() {
    this.ventaProvider.listarTipoVenta().subscribe(data => {
      this.ventaTipos = data;
    }, error => {
      console.log(error);
    });
  }

  listarClientes() {
    this.ventaProvider.listarClientes().subscribe(data => {
      this.clientes = data;
    }, error => {
      console.log(error);
    });
  }

  

}
