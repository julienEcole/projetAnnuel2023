import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  pseudo: string = '';
  email: string = '';
  password: string = '';
  champsIncomplets: boolean = false;
  mailDejaUtilise: boolean = false;
  inscriptionReussie: boolean = false;

  constructor(private userService: UserService) {}

  register() {
    this.champsIncomplets = false;
    this.mailDejaUtilise = false;
  
    if (!this.pseudo || !this.email || !this.password) {
      this.champsIncomplets = true;
    } else {
      this.userService.registerUser(this.pseudo, this.email, this.password).subscribe(
        (inscriptionReussie) => {
          if (inscriptionReussie) {
            this.inscriptionReussie = true;
          } else {
            this.mailDejaUtilise = true;
          }
        },
        (error) => {
          console.log("Erreur lors de l'inscription :", error);
        }
      );
    }
  }
}
