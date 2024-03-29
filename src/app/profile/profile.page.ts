import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../service/utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData : any;
  constructor(private utilities : UtilitiesService) { }
  edit: boolean = false;
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userData = this.utilities.getDataUser();
    console.log('this.userData',this.userData);
  }

  editData(){
    this.edit=true;
  }
  saveData(){
    this.edit=false;
  }
}
