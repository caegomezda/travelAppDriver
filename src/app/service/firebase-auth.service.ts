import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../aInterfaces/fire-base-interface';
import { FirebaseApiService } from './firebase-api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  currentUser: User = null;
  credential:any;
  constructor(
    private afAuth: AngularFireAuth,
    private firebaseApi : FirebaseApiService,
    private utilities : UtilitiesService
    ) {
    this.afAuth.onAuthStateChanged((user:any )=> {
      this.currentUser = user;
    })
  }

  async signIn({email, password}){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  
  // async getToken(){
  //   let result = await (await this.afAuth.currentUser).getIdToken();

  //   return result;
  // }

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
    // this.utilities.saveUserCredential(this.credential);
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
    this.firebaseApi.addUser(this.credential,newForm,1)
  }

  
}
