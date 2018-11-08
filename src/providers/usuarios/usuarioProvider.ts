import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../models/usuario.modelo';
import { Empleado } from '../../models/empleado.modelo';
import { Rol } from '../../models/rol.modelo';
import { Sesion } from '../../models/sesion.modelo';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  url = "http://gamercash.info:8080";

  constructor(public http: HttpClient) {
    console.log('Hello UsuariosProvider Provider');
  }

  listarUsuarios():Observable<Array<Usuario>>{
    return this.http.get<Array<Usuario>>(this.url+"/usuarios");
  }

  usuarioPorId(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.url+"/usuarios/"+id);
  }

  listarEmpleados():Observable<Array<Empleado>>{
    return this.http.get<Array<Empleado>>(this.url+"/empleados");
  }

  listarRoles():Observable<Array<Rol>>{
    return this.http.get<Array<Rol>>(this.url+"/roles");
  }

  crearUsuario(usuario : Usuario):Observable<any>{
    return this.http.post(this.url+"/empleados/"+usuario.empleadoId+"/roles/"+usuario.rolId+"/usuarios", usuario);
  }

  nuevaSesion(sesion : Sesion):Observable<any>{
    console.log(sesion.usuario_id);
    return this.http.post(this.url+"/usuarios/"+sesion.usuario_id+"/sesiones/", sesion);
  }

  verSesion():Observable<Array<Sesion>>{
    return this.http.get<Array<Sesion>>(this.url+"/sesiones");
  }



  /* eliminarCliente( id) : Observable<any>{
    console.log(id);
    return this.http.delete<Cliente>(this.apiUrl+'/clientes/'+id);
  } */

}
