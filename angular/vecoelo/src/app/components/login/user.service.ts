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

  constructor(private http: HttpClient) { }

  registerUser(pseudo: string, email: string, password: string): Observable<boolean> {
    const user = {
      pseudo,
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
        if (utilisateur && utilisateur.mdp === password) {
          this.estConnecte = true;
          
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
    return this.estConnecte;
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

  getNomUtilisateurConnecte(): string | null {
    if (this.estConnecte) {
      const utilisateur = this.http.get<boolean>(`${this.baseUrl}/utilisateur/get/utilisateur/mail/${this.email}`).pipe(
        map((response: any) => {
          return response?.pseudo || null;
        }),
        catchError(() => {
          console.log("Erreur lors de la récupération de l'utilisateur connecté");
          return of(null);
        })
      );
      return this.pseudo;
    } else {
      return null;
    }
  }


  deconnexion(): void {
    this.estConnecte = false;
  }

}
