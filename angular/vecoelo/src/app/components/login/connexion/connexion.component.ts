import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  champsIncomplets: boolean = false;
  connexionReussie: boolean = false;
  erreurConnexion: boolean = false;

  constructor(private userService: UserService) {}

  login() {
    this.champsIncomplets = false;
    this.erreurConnexion = false;

    if (!this.email || !this.password) {
      this.champsIncomplets = true;
      console.log('Veuillez remplir tous les champs.');
    } else {
      const isLoggedIn = this.userService.loginUser(this.email, this.password);
      if (isLoggedIn) {
        this.connexionReussie = true;
      } else {
        this.erreurConnexion = true;
      }
    }
  }
}
