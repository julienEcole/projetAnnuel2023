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
        this.utilisateurs = response.results.map((utilisateur: any) => ({
          ...utilisateur,
          editionEnCours: false,
          nouvelEmail: utilisateur.email,
          nouveauPrenom: utilisateur.prenom,
          nouveauNom: utilisateur.nom,
          nouveauPseudo: utilisateur.pseudo
        }));
      },
      (error: any) => {
        console.log('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

  editerUtilisateur(utilisateur: any) {
    utilisateur.editionEnCours = true;
  }

  annulerEdition(utilisateur: any) {
    utilisateur.editionEnCours = false;
  }

  enregistrerEdition(utilisateur: any) {
    const { utilisateur_id, nouvelEmail, nouveauPrenom, nouveauNom, nouveauMotDePasse, nouveauPseudo } = utilisateur;
  
    const utilisateurModifie = {
      utilisateur_id,
      mail: nouvelEmail,
      prenom: nouveauPrenom,
      nom: nouveauNom,
      password: nouveauMotDePasse,
      pseudo: nouveauPseudo
    };
  
    this.adminService.updateUtilisateur(utilisateur_id.toString(), utilisateurModifie).subscribe(
      (response: any) => {
        console.log('Mise à jour de l\'utilisateur réussie');
        utilisateur.email = nouvelEmail; // Met à jour la valeur de l'email affichée
        utilisateur.editionEnCours = false;
        window.location.reload(); // Recharge la page actuelle
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
