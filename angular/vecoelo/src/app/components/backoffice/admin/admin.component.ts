import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  utilisateurs: any[] = [];
  problemes: any[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    console.log('Role utilisateur ID:', localStorage.getItem('roleUtilisateurId')); // Vérifier la valeur du rôle utilisateur ID
    
    if (!this.adminService.estRoleAdmin()) {
      console.log('Redirection vers la page d\'accueil');
      this.router.navigate(['/home']);
    } else {
      console.log('Chargement des utilisateurs et des problèmes');
      this.fetchUtilisateurs();
      this.fetchProblemes();
    }
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

  fetchProblemes() {
    this.adminService.getAllProblemes().subscribe(
      (response: any) => {
        this.problemes = response.results.map((probleme: any) => ({
          ...probleme,
          editionEnCours: false,
          nouveauTitre: probleme.titre,
          nouvelleAdresse: probleme.adresse,
          nouvelleDescription: probleme.description,
          utilisateur_pseudo: '' // Initialize the pseudo property
        }));
  
        // Retrieve usernames for each user ID
        this.retrieveUsernames();
      },
      (error: any) => {
        console.log('Erreur lors de la récupération des problèmes :', error);
      }
    );
  }
  
  retrieveUsernames() {
    this.problemes.forEach((probleme: any) => {
      this.adminService.getUtilisateurById(probleme.utilisateur_id).subscribe(
        (response: any) => {
          const utilisateur = response.results[0];
          probleme.utilisateur_pseudo = utilisateur.pseudo; // Assign the pseudo to the probleme object
        },
        (error: any) => {
          console.log('Erreur lors de la récupération du pseudo de l\'utilisateur :', error);
        }
      );
    });
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
        this.fetchUtilisateurs(); // Rafraîchit la liste des utilisateurs
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

  editerProbleme(probleme: any) {
    probleme.editionEnCours = true; // Passer en mode édition
  }

  enregistrerEditionProbleme(probleme: any) {
    const updatedProbleme = {
      probleme_id: probleme.probleme_id,
      titre: probleme.nouveauTitre,
      adresse: probleme.nouvelleAdresse,
      description: probleme.nouvelleDescription
    };
    console.log('Requête de modification (édit) :', updatedProbleme); // Affichage de la requête de modification dans la console

    this.adminService.updateProbleme(probleme.probleme_id.toString(), updatedProbleme).subscribe(
      (response: any) => {
        console.log('Mise à jour du problème réussie');
        probleme.editionEnCours = false; // Sortir du mode édition
        this.fetchProblemes(); // Rafraîchit la liste des problèmes
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de la mise à jour du problème :", error);
      }
    );
  }

  annulerEditionProbleme(probleme: any) {
    probleme.editionEnCours = false; // Annuler les modifications et sortir du mode édition
    // Réinitialiser les valeurs des champs de texte aux valeurs initiales si nécessaire
    probleme.nouveauTitre = probleme.titre;
    probleme.nouvelleAdresse = probleme.adresse;
    probleme.nouvelleDescription = probleme.description;
  }

  supprimerProbleme(problemeId: number) {
    console.log("Suppression du problème avec l'ID :", problemeId);

    if (confirm("Êtes-vous sûr de vouloir supprimer ce problème ?")) {
      this.adminService.deleteProbleme(problemeId.toString()).subscribe(
        (response: any) => {
          console.log('Problème supprimé');
          this.fetchProblemes(); // Mettre à jour la liste des problèmes après la suppression
        },
        (error: any) => {
          console.log("Une erreur s'est produite lors de la suppression du problème :", error);
        }
      );
    }
  }
}