import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtelierService } from 'src/app/pages/reparateur-proche/atelier.service';

@Component({
  selector: 'app-profil-reparateur',
  templateUrl: './profil-reparateur.component.html',
  styleUrls: ['./profil-reparateur.component.css']
})
export class ProfilReparateurComponent implements OnInit {
  atelier: any;
  ratedStars: number = 0;
  stars: any[] = [];

  constructor(private route: ActivatedRoute, private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const repairShopID = params['id'];
      // Récupérer les détails du réparateur à partir de l'ID et assigner à repairShop
      this.getRepairShopDetails(repairShopID);
    });

    this.initializeStars();
  }

  getRepairShopDetails(repairShopID: string): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.atelierService.getRepairShopDetails(repairShopID).subscribe(
            (atelier) => {
              this.atelier = atelier.results[0];
              this.atelier.latitude = parseFloat(atelier.results[0].latitude);
              this.atelier.longitude = parseFloat(atelier.results[0].longitude);
  
              const distance = this.calculateDistance(latitude, longitude, this.atelier.latitude, this.atelier.longitude);
              this.atelier.distance = distance;
  
              console.log(atelier.distance);
              console.log('Chargement des détails du réparateur réussi:', this.atelier);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération de la position :', error);
        }
      );
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
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
  };
  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  };
  initializeStars(): void {
    for (let i = 0; i < 5; i++) {
      this.stars.push({
        filled: false
      });
    }
  }

  fillStars(): void {
    this.stars.forEach((star, index) => {
      star.filled = index < this.ratedStars;
    });
  }

  getStarRating(): string {
    return `${this.ratedStars}/5`;
  }
}
