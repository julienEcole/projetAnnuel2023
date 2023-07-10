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
    const utilisateurConnecte = this.userService.utilisateurConnecte;
    if (utilisateurConnecte) {
      this.pseudo = utilisateurConnecte.pseudo;
      this.mail = utilisateurConnecte.email;
      this.dateInscription = utilisateurConnecte.dateCreation || '';
      // Calcul du nombre de jours d'inscription en utilisant la date actuelle
      const dateInscription = new Date(this.dateInscription);
      const currentDate = new Date();
      const timeDiff = Math.abs(currentDate.getTime() - dateInscription.getTime());
      this.joursInscription = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
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
        const utilisateurConnecte = this.userService.utilisateurConnecte;
        if (utilisateurConnecte) {
          // Mettre à jour les données de l'utilisateur
          utilisateurConnecte.pseudo = this.pseudoModifie;
          utilisateurConnecte.email = this.mailModifie;
          utilisateurConnecte.password = this.passwordModifie; // Ajout de la ligne pour le mot de passe

          // Enregistrer les modifications dans le localStorage
          localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateurConnecte));

          // Réinitialiser les champs de saisie et désactiver la modification du profil
          this.pseudoModifie = '';
          this.mailModifie = '';
          this.passwordModifie = '';
          this.modifierProfil = false;

          // Afficher un message de succès ou effectuer d'autres actions nécessaires
          console.log('Profil modifié :', utilisateurConnecte);

          // Recharger la page
          window.location.reload();
        }
      } else {
        // Afficher un message d'erreur ou effectuer d'autres actions nécessaires
        console.log('Veuillez remplir tous les champs de modification');
      }
    }
  }
}
