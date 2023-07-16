import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/login/user.service';

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

  constructor(private userService: UserService) { }
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

  changerProfil(): void {
    console.log('Pseudo modifié :', this.pseudoModifie);
      console.log('Adresse e-mail modifiée :', this.mailModifie);
      console.log('Mot de passe modifié :', this.passwordModifie);
  if (!this.modifierProfil) {
    this.modifierProfil = true;
  } else {
    if (this.pseudoModifie && this.mailModifie) {
      const userId = localStorage.getItem('id');
      console.log('ID utilisateur :', userId);
      console.log('Pseudo modifié :', this.pseudoModifie);
      console.log('Adresse e-mail modifiée :', this.mailModifie);
      console.log('Mot de passe modifié :', this.passwordModifie);
      if (userId) {
        // Changer le mot de passe
        if (this.passwordModifie) {
          this.userService.updatePassword(userId, this.passwordModifie).subscribe(
            (response: any) => {
              console.log('Mot de passe modifié');
            },
            (error: any) => {
              console.log("Une erreur s'est produite lors de la modification du mot de passe :", error);
            }
          );
        }

        // Changer l'adresse e-mail
        if (this.mailModifie !== this.mail) {
          this.userService.updateEmail(userId, this.mailModifie).subscribe(
            (response: any) => {
              // Gérer la réponse de la mise à jour de l'adresse e-mail
              console.log('Adresse e-mail modifiée');
            },
            (error: any) => {
              console.log("Une erreur s'est produite lors de la modification de l'adresse e-mail :", error);
            }
          );
        }

        // Changer le pseudo
        if (this.pseudoModifie !== this.pseudo) {
          this.userService.updatePseudo(userId, this.pseudoModifie).subscribe(
            (response: any) => {
              // Gérer la réponse de la mise à jour du pseudo
              console.log('Pseudo modifié');
            },
            (error: any) => {
              console.log("Une erreur s'est produite lors de la modification du pseudo :", error);
            }
          );
        }

        // Réinitialiser les champs de saisie et désactiver la modification du profil
        this.pseudoModifie = '';
        this.mailModifie = '';
        this.passwordModifie = '';
        this.modifierProfil = false;

        
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