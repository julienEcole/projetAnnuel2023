import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  utilisateurs: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.fetchUtilisateurs();
  }

  fetchUtilisateurs() {
    this.adminService.getAllUtilisateurs().subscribe(
      (response: any) => {
        this.utilisateurs = response.results;
      },
      (error: any) => {
        console.log('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

  editerUtilisateur(utilisateurId: number, nouveauMotDePasse: string, nouvelEmail: string, nouveauPseudo: string) {
    const utilisateur = {
      utilisateur_id: utilisateurId,
      password: nouveauMotDePasse,
      email: nouvelEmail,
      pseudo: nouveauPseudo
    };

    this.adminService.updateUtilisateur(utilisateurId.toString(), utilisateur).subscribe(
      (response: any) => {
        console.log('Mise à jour de l\'utilisateur réussie');
        // Mettre à jour la liste des utilisateurs après la modification
        this.fetchUtilisateurs();
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de la mise à jour de l'utilisateur :", error);
      }
    );
  }

  supprimerUtilisateur(utilisateurId: number) {
    console.log("Suppression de l'utilisateur avec l'ID :", utilisateurId);

    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.adminService.deleteUtilisateur(utilisateurId.toString()).subscribe(
        (response: any) => {
          console.log('Utilisateur supprimé');
          // Mettre à jour la liste des utilisateurs après la suppression
          this.fetchUtilisateurs();
        },
        (error: any) => {
          console.log("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        }
      );
    }
  }
}
