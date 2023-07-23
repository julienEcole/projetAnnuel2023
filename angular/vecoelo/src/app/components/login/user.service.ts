import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SHA256, SHA512 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3999';
  private estConnecte: boolean = false;
  private pseudo: string = '';
  private email: string = '';
  private id: string = '';
  private nom: string = '';
  private prenom: string = '';
  private roleUtilisateurId: number = 0;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(pseudo: string, nom: string, prenom: string, email: string, password: string): Observable<boolean> {
    const user = {
      pseudo,
      nom,
      prenom,
      email,
      password
    };
    console.log(user);
    return this.http.post<any>(`${this.baseUrl}/utilisateur/create/utilisateur`, user)
      .pipe(
        catchError(() => {

          console.log("Erreur lors de l'inscription");
          return of(false);
        })
      );
  }

  loginUser(email: string, password: string): Observable<boolean> {
    return this.http.get<any>(`${this.baseUrl}/utilisateur/get/utilisateur/mail/${email}`).pipe(
      map((response: any) => {
        console.log("le result : " + response.results[0].pseudo);
        const utilisateur = response.results[0];
        this.pseudo = utilisateur.pseudo;
        this.email = utilisateur.mail;
        this.id = utilisateur.utilisateur_id;
        this.roleUtilisateurId = utilisateur.role_utilisateur_id;
        console.log(this.pseudo, this.email, this.id)
  
        const motDePasseHache = SHA512(password).toString(); 

        if (utilisateur && utilisateur.mdp === motDePasseHache) {
          this.estConnecte = true;
          localStorage.setItem('estConnecte', "true");
          localStorage.setItem('pseudo', this.pseudo);
          localStorage.setItem('id', this.id);
          localStorage.setItem('email', this.email);
          localStorage.setItem('roleUtilisateurId', this.roleUtilisateurId.toString()); 
          console.log('Connexion réussie');
          return true;
        } else {
          console.log('Échec de la connexion : email ou mot de passe incorrect');
          return false;
        }
      }),
      catchError(() => {
        console.log('Échec de la connexion : email ou mot de passe incorrect');
        return of(false);
      })
    );
  }
  estUtilisateurConnecte(): boolean {
    this.estConnecte = localStorage.getItem('estConnecte') === 'true';
    if (this.estConnecte) {
      return this.estConnecte;
    } else {
      return false;
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/utilisateur/get/utilisateur/mail/${email}`)
      .pipe(
        catchError(() => {
          console.log("Erreur lors de la vérification de l'e-mail existant");
          return of(false);
        })
      );
  }
  getOneUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur/id/${id}`;
    return this.http.get<any>(url);
  }
  getOneUserByMail(email: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur/mail/${email}`;
    return this.http.get<any>(url);
  }


  updateOneUserByMail(email: string, user: any): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/patch/utilisateur/mail/${email}`;
    return this.http.patch(url, user);
  }

  getNomUtilisateurConnecte(): string {
    this.estConnecte = this.estUtilisateurConnecte();
    if (this.estConnecte) {
      this.pseudo = localStorage.getItem('pseudo') || "";
      return this.pseudo;
    } else {
      return '';
    }
  }
  getUtilisateurId(): string {
    this.estConnecte = this.estUtilisateurConnecte();
    if (this.estConnecte) {
      this.id = localStorage.getItem('id') || "";
      return this.id;
    } else {
      return '';
    }
  }

  updateUser(id: string, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/patch/utilisateur/${id}`;
    localStorage.setItem('pseudo', updatedData.pseudo);
    localStorage.setItem('email', updatedData.mail);
    this.router.navigate(['/home']);
    return this.http.patch(url, updatedData);
  }

  deleteOneUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/delete/utilisateur/id/${id}`;
    localStorage.removeItem('estConnecte');
    localStorage.removeItem('pseudo');
    this.estConnecte = false;
    this.router.navigate(['/home']);
    return this.http.delete(url);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/utilisateur/get/utilisateur`).pipe(
      catchError((error) => {
        console.log('Erreur lors de la récupération des utilisateurs :', error);
        return of(null);
      })
    );
  }
  deconnexion(): void {
    localStorage.removeItem('estConnecte');
    localStorage.removeItem('pseudo');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('roleUtilisateurId');
    this.estConnecte = false;
    this.router.navigate(['/home']);
  }
}
