import { Component } from '@angular/core';
import { UserService } from './components/login/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vecoelo';
  constructor(private userService: UserService) {}

  get nomUtilisateurConnecte(): string | null {
    return this.userService.utilisateurConnecte?.pseudo || null;
  }
  deconnexion(): void {
    this.userService.deconnexion();
  }
}
