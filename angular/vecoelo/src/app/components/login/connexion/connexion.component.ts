import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {console.log(userService)}
  
  login() {
    this.champsIncomplets = false;
    this.erreurConnexion = false;
    console.log(this.email, this.password);
    if (!this.email || !this.password) {
      this.champsIncomplets = true;
      console.log('Veuillez remplir tous les champs.');
    } else {
      this.userService.loginUser(this.email, this.password).subscribe(
        (isLoggedIn: boolean) => {
          if (isLoggedIn) {
            this.connexionReussie = true;
            console.log('Connexion réussie !');
            this.router.navigate(['/home']);
          } else {
            this.erreurConnexion = true;
          }
        },
        (error: any) => {
          console.log("Une erreur s'est produite lors de la connexion :", error);
        }
      );
    }
  }
}
