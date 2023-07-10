import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import repairShopsData from '../../../pages/reparateur-proche/reparateur.json';

@Component({
  selector: 'app-profil-reparateur',
  templateUrl: './profil-reparateur.component.html',
  styleUrls: ['./profil-reparateur.component.css']
})
export class ProfilReparateurComponent implements OnInit {
  repairShop: any;
  ratedStars: number = 0;
  stars: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const repairShopID = params['id'];
      // Récupérer les détails du réparateur à partir de l'ID et assigner à repairShop
      this.repairShop = this.getRepairShopDetails(repairShopID);
    });

    this.initializeStars();
  }

  getRepairShopDetails(repairShopID: string): any {
    const foundRepairShop = repairShopsData.find((repairShop: any) => repairShop.id === repairShopID);
    return foundRepairShop;
  }

  initializeStars(): void {
    for (let i = 0; i < 5; i++) {
      this.stars.push({
        filled: false
      });
    }
  }

  rateRepairShop(selectedStar: any): void {
    const selectedIndex = this.stars.indexOf(selectedStar);
  
    if (selectedIndex === this.ratedStars - 1) {
      // L'utilisateur a cliqué sur la même étoile, on réinitialise l'évaluation
      this.ratedStars = 0;
      this.stars.forEach(star => star.filled = false);
    } else {
      // L'utilisateur a cliqué sur une étoile différente, on met à jour l'évaluation
      this.ratedStars = selectedIndex + 1;
  
      this.stars.forEach((star, index) => {
        if (index <= selectedIndex) {
          star.filled = true;
        } else {
          star.filled = false;
        }
      });
    }
  }
  getStarRating(): string {
    return `${this.ratedStars}/5`;
  }  
}
