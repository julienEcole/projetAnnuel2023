import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/login/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  dateInscription: string = '';
  modifierProfil: boolean = false;
  joursInscription: number = 0;
  pseudo: string = '';
  mail: string = '';
  pseudoModifie: string = '';
  mailModifie: string = '';
  passwordModifie: string = '';
  baseUrl = 'http://localhost:3999';

  constructor(private userService: UserService, private router: Router) { }
  get nomUtilisateurConnecte(): string | null {
    return this.userService.getNomUtilisateurConnecte();
  }

  ngOnInit(): void {
    let mail = localStorage.getItem('email') || '';
    this.userService.getOneUserByMail(mail).subscribe(
      (response: any) => {
        console.log('Réponse reçue :', response);
        const utilisateur = response.results[0];
        console.log('Utilisateur trouvé :', utilisateur);
        this.pseudo = utilisateur.pseudo;
        this.mail = utilisateur.mail;
        console.log('Pseudo :', this.pseudo);
        console.log('Mail :', this.mail);
        this.dateInscription = utilisateur.dateCreation || '';
        // Calcul du nombre de jours d'inscription en utilisant la date actuelle
        const dateInscription = new Date(this.dateInscription);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - dateInscription.getTime());
        this.joursInscription = Math.ceil(timeDiff / (1000 * 3600 * 24));


      },
      (error: any) => {
        console.log('Une erreur s\'est produite lors de la récupération des informations utilisateur :', error);
      }
    );
  }

  formatDateTime(dateTime: string): string {
    if (!dateTime) {
      return ""; // Gérer le cas où dateTime est vide ou non défini
    }

    const date = new Date(dateTime);
    date.setHours(date.getHours() + 2);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric' as const,
    };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    if (isNaN(date.getTime())) {
      return ""; // Gérer le cas où dateTime n'est pas une date valide
    }
    return formatter.format(date);
  }
  deleteProfil(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.deleteOneUserById(userId).subscribe(
        (response: any) => {
          console.log('Utilisateur supprimé');
          localStorage.clear();
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.log("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        }
      );
    };
  }
  changerProfil(): void {
    if (!this.modifierProfil) {
      this.modifierProfil = true;
    } else {
      if (this.pseudoModifie && this.mailModifie) {
        const userId = localStorage.getItem('id');
        console.log('ID utilisateur :', userId);

        if (userId) {
          const updatedUserData = {
            password: this.passwordModifie,
            mail: this.mailModifie,
            pseudo: this.pseudoModifie
          };
          console.log('Données utilisateur mises à jour :', updatedUserData);
          console.log(this.userService.updateUser(userId, updatedUserData));
          this.userService.updateUser(userId, updatedUserData).subscribe(
            response => {
              console.log('Mise à jour effectuée avec succès', response);
              
            },
            error => {
              console.error("Erreur lors de la requête :", `${this.baseUrl}/utilisateur/patch/utilisateur/${userId}`, updatedUserData);
              console.error('Erreur lors de la mise à jour', error);
            }
          );
        } else {
          console.log('ID utilisateur non trouvé dans le localStorage');
        }
      } else {
        // Afficher un message d'erreur ou effectuer d'autres actions nécessaires
        console.log('Veuillez remplir tous les champs de modification');
      }
    }
  }
}