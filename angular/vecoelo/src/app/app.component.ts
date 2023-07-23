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
  id = localStorage.getItem('id');
constructor(private userService: UserService, public adminService: AdminService) {}

get nomUtilisateurConnecte(): string | null {
  return this.userService.getNomUtilisateurConnecte();
}

deconnexion(): void {
  this.userService.deconnexion();
  }
}
