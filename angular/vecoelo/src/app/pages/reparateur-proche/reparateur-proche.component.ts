import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reparateur-proche',
  templateUrl: './reparateur-proche.component.html',
  styleUrls: ['./reparateur-proche.component.css']
})
export class ReparateurProcheComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Utilisez les coordonnées géographiques pour effectuer la recherche des réparateurs les plus proches
          // Appelez une fonction ou un service pour obtenir les réparateurs
          // avec les coordonnées géographiques
          // Passer les coordonnées géographiques (latitude, longitude) à la fonction ou au service
        },
        (error) => {
          console.log('Erreur de géolocalisation :', error);
          // Gérer les erreurs de géolocalisation
        }
      );
    } else {
      console.log('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      // Gérer le cas où la géolocalisation n'est pas prise en charge
    }
  }

}