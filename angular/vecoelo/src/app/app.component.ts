import { Component } from '@angular/core';
import { UserService } from './components/login/user.service';
import { AdminService } from './components/backoffice/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vecoelo';
  constructor(private userService: UserService, public adminService: AdminService) {}
  
  get nomUtilisateurConnecte(): string | null {
    return this.userService.getNomUtilisateurConnecte();
  }
  get UtilisateurId(): string | null {
    return this.userService.getUtilisateurId();
  }

  deconnexion(): void {
    this.userService.deconnexion();
    }
  }
