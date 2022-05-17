import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  constructor(
    private utilities : UtilitiesService,
    private http:HttpClient,
  ) { }


  async getAccountData(){
    let credential = {
      uid:  await this.utilities.getIdUser(),
      token:  await this.utilities.getToken()
    }
    
    console.log('credential',credential);

    let result  = await this.fetchUserInfo2Api(credential,1);

    console.log('result',result);
    console.log('_________________________________________________________________________________________');
    let data = await this.getData(result);
    console.log('data___________',data);
    return data
  }

  async fetchUserInfo2Api(credential,urlType){
    let url = await this.utilities.getUrlType(urlType);
    let uid = credential["uid"];
    let accessToken = credential["token"]
    const apiUrl = `${url}${uid}.json?auth=${accessToken}`;
    console.log('apiUrl',apiUrl);
    let json = {}
    json = JSON.stringify(json);
    console.log('json',json);
    let result =  await this.http.get(`${apiUrl}`, json).pipe(map( data => data)).toPromise();
    console.log('result__________________________________________________',result);
    return  this.http.get(`${apiUrl}`, json).pipe(map( data => data)).toPromise();
  }

  async getData(dataJson){
    let data = [];
    for (let key in dataJson) {
      data = dataJson[key] 
    }
    this.utilities.saveDataUser(data);
  }
}
