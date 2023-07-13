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

  ngOnInit(): void {
    this.userService.getOneUserById().subscribe(
      (response: any) => {
        const utilisateur = response.data;
        if (utilisateur) {
          this.pseudo = utilisateur.pseudo;
          this.mail = utilisateur.mail;
          this.dateInscription = utilisateur.dateCreation || '';
          // Calcul du nombre de jours d'inscription en utilisant la date actuelle
          const dateInscription = new Date(this.dateInscription);
          const currentDate = new Date();
          const timeDiff = Math.abs(currentDate.getTime() - dateInscription.getTime());
          this.joursInscription = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
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
    if (!this.modifierProfil) {
      this.modifierProfil = true;
    } else {
      if (this.pseudoModifie && this.mailModifie) {
        const user = {
          pseudo: this.pseudoModifie,
          mail: this.mailModifie,
          password: this.passwordModifie
        };
  
        this.userService.updateOneUserByMail(this.mail, user).subscribe(
          (response: any) => {
            const utilisateur = response.data;
            if (utilisateur) {
              // Réinitialiser les champs de saisie et désactiver la modification du profil
              this.pseudoModifie = '';
              this.mailModifie = '';
              this.passwordModifie = '';
              this.modifierProfil = false;
  
              // Afficher un message de succès ou effectuer d'autres actions nécessaires
              console.log('Profil modifié :', utilisateur);
  
              // Recharger la page
              window.location.reload();
            }
          },
          (error: any) => {
            console.log("Une erreur s'est produite lors de la modification du profil :", error);
          }
        );
      } else {
        // Afficher un message d'erreur ou effectuer d'autres actions nécessaires
        console.log('Veuillez remplir tous les champs de modification');
      }
    }
  }  
}
