import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UtilitiesService } from '../service/utilities.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
subjects;
  constructor(
    private router: Router,
    private utilities : UtilitiesService) { }

  ngOnInit() {
    this.subjects=[
      {
        icon: 'assets/icon/person-outline.svg',
        name: 'Perfil',
        id: '/profile'
      },
      {
        icon: 'assets/icon/car-sport-outline.svg',
        name: 'Servicio de taxis',
        id: '/principal'
      },
      {
        icon: 'assets/icon/navigate-outline.svg',
        name: 'Viaje intermunicipal',
        id: '/intermunicipal'
      },
      {
        icon: 'assets/icon/help-outline.svg',
        name: 'Ayuda',
        id: '/contac'
      },
    ];
  }
  

  goToSubject(item){
    this.router.navigateByUrl(item.id, {replaceUrl: true});
  }
}
