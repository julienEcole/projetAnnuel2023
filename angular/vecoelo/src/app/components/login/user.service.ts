import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  utilisateurConnecte: User | null = null;

  constructor(private router: Router) {
    // Récupérer les utilisateurs stockés dans le localStorage lors de l'initialisation du service
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    const storedUser = localStorage.getItem('utilisateurConnecte');
    if (storedUser) {
      this.utilisateurConnecte = JSON.parse(storedUser);
    }
  }

  registerUser(pseudo: string, email: string, password: string): boolean {
    const userExists = this.checkEmailExists(email);
    if (userExists) {
      console.log("L'email est déjà utilisé.");
      return false;
    } else {
      const user: User = {
        pseudo,
        email,
        password,
        dateCreation: new Date().toISOString() // Ajouter la date de création
      };
      this.users.push(user);
      // Enregistrer les utilisateurs dans le localStorage
      localStorage.setItem('users', JSON.stringify(this.users));
      console.log('Utilisateur enregistré :', user);
      return true;
    }
  }

  loginUser(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.utilisateurConnecte = user;
      localStorage.setItem('utilisateurConnecte', JSON.stringify(user));
      console.log('Utilisateur connecté :', user);
      this.router.navigate(['/home']); // Rediriger vers la page d'accueil
      return true;
    } else {
      console.log('Échec de la connexion : email ou mot de passe incorrect');
      return false;
    }
  }

  checkEmailExists(email: string): boolean {
    const user = this.users.find(u => u.email === email);
    return !!user;
  }

  deconnexion(): void {
    this.utilisateurConnecte = null;
    localStorage.removeItem('utilisateurConnecte');
    // Autres logiques de déconnexion si nécessaire
  }
}

interface User {
  pseudo: string;
  email: string;
  password: string;
  dateCreation?: string;
}
