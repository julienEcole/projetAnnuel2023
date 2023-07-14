import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:1337';
  private estConnecte: boolean = false;
  private pseudo: string = '';
  private email: string = '';
  private id: string = '';
  private nom: string = '';
  private prenom: string = '';

  constructor(private http: HttpClient) { }
 
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
        const utilisateur = response.results[0];
        this.pseudo = utilisateur.pseudo;
        this.email = utilisateur.email;
        this.id = utilisateur.id;
        if (utilisateur && utilisateur.mdp === password) {
          this.estConnecte = true;
          localStorage.setItem('estConnecte', "true");
          localStorage.setItem('pseudo', this.pseudo);
          localStorage.setItem('id', this.id);
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
    if(this.estConnecte) {
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
  getOneUserById(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/utilisateur/get/utilisateur/`);
  }


  updateOneUserByMail(email: string, user: any): Observable<any> {
    const url = `utilisateur/put/utilisateur/mail/${email}`;
    return this.http.put(url, user);
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
  


  deconnexion(): void {
    localStorage.removeItem('estConnecte');
    localStorage.removeItem('pseudo');
    this.estConnecte = false;
  }

}
