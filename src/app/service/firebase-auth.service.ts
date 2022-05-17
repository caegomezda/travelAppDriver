import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../aInterfaces/fire-base-interface';
import { UtilitiesService } from './utilities.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private  httpOptions:any= { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };
  currentUser: User = null;
  credential:any;
  constructor(
    private afAuth: AngularFireAuth,
    private http:HttpClient,
    private utilities : UtilitiesService
    ) {
    this.afAuth.onAuthStateChanged((user:any )=> {
      this.currentUser = user;
    })
  }

  signIn({email, password}){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  get isEmailVerified() :boolean {
    return (this.currentUser.emailVerified !== false) ? true : false;
  }

  async SendVerificationMail() {
    let result = (await this.afAuth.currentUser).sendEmailVerification();
    return result 
  }

  async signUp(credentialForm){
    let email = credentialForm.email;
    let password = credentialForm.password;
    await this.userCreationRealTimeData({email,password});
  }

  async userCreationRealTimeData({ email, password }): Promise<any>{
    this.credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    let creationTime = this.credential.user.metadata.createdAt;
    let uid = this.credential.user.uid;
    let newForm = {
        email: email,
        name:"",
        creationDate:creationTime,
        uid:uid,
        isActive:true,
        phone:"",
        userType:"user"
    }
    await this.AddInstance(this.credential,newForm,1);
  }

  async AddInstance(credential,form,urlType){
    let uid = credential.user.uid;
    let url = await this.utilities.getUrlType(urlType)
    let accessToken = await credential.user._delegate.accessToken;
    const apiUrl = `${url}${uid}.json?auth=${accessToken}`;
    console.log('apiUrl',apiUrl);
    let json = form
    json = JSON.stringify(json);
    return await this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }
  
}
