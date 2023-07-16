import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import repairShopsData from './reparateur.json';

@Component({
  selector: 'app-reparateur-proche',
  templateUrl: './reparateur-proche.component.html',
  styleUrls: ['./reparateur-proche.component.css']
})
export class ReparateurProcheComponent implements OnInit {
  nearestRepairShops: any[] = [];
  displayedRepairShops: any[] = [];
  selectedRepairShop: any = {};
  showMore: boolean = false;
  ReparateurID: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLocation();
    
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.nearestRepairShops = repairShopsData;

          for (const repairShop of this.nearestRepairShops) {
            const distance = this.calculateDistance(latitude, longitude, repairShop.Latitude, repairShop.Longitude);
            repairShop.distance = distance;
          }

          this.nearestRepairShops.sort((a, b) => a.distance - b.distance);

          this.displayNearestRepairShops();
        },
        (error) => {
          console.log('Erreur de géolocalisation :', error);
        }
      );
    } else {
      console.log('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Rayon de la Terre en kilomètres

    const lat1Rad = this.deg2rad(lat1);
    const lon1Rad = this.deg2rad(lon1);
    const lat2Rad = this.deg2rad(lat2);
    const lon2Rad = this.deg2rad(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  displayNearestRepairShops(): void {
    this.nearestRepairShops = repairShopsData;
    this.displayedRepairShops = this.nearestRepairShops.slice(0, 3);
  }

  showMoreRepairShops(): void {
    const currentLength = this.displayedRepairShops.length;
    const remainingRepairShops = this.nearestRepairShops.slice(currentLength, currentLength + 6);

    this.displayedRepairShops = this.displayedRepairShops.concat(remainingRepairShops);

    if (this.displayedRepairShops.length === this.nearestRepairShops.length) {
      this.showMore = false;
    }
  }
  getImagePath(nom: string): string {
    return './assets/assets-reparateur/' + nom.replace(/ /g, '_') + '.jpg';
  }

}
