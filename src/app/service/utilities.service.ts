import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  idUser:any;
  token:any;
  item:any;
  correoUsuario:any;
  dataUser:any;
  private userURL = environment.urlConfing.USERURL;
  private driverURL = environment.urlConfing.DRIVERTURL;
  private movementURL = environment.urlConfing.MOVEMENTURL;
  constructor() { }

  saveUsu(correo){
    this.correoUsuario = correo;
  }

  sendUsu(){
    let result = this.correoUsuario;
    return result;
  }

  saveIdUser(id){
    this.idUser = id;
  }
  //Obtiene la id del usuario activo
  getIdUser(){
    return this.idUser;
  }

  saveTokenUser(token){
    this.token = token;
  }

  getToken(){
    return this.token;
  }

  async getDataUser(){
    return await this.dataUser;
  }

  async saveDataUser(data){
    console.log('_______________________________________________________________________');
    console.log('data',data);
    this.dataUser = await data;
  }

  getUrlType(urlType){
    switch (urlType) {
      case 1:
        return this.userURL;
      case 2:
        return this.driverURL;
      case 3:
        return this.movementURL;
      default:
        break;
    }
  }
}
