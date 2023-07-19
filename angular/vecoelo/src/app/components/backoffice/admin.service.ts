import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3999';

  constructor(private http: HttpClient) { }

  getAllUtilisateurs(): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur`;
    return this.http.get(url);
  }

  updateUtilisateur(utilisateurId: string, utilisateurData: any): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/patch/utilisateur/${utilisateurId}`;
    return this.http.patch(url, utilisateurData);
  }

  deleteUtilisateur(utilisateurId: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/delete/utilisateur/id/${utilisateurId}`;
    return this.http.delete(url);
  }
  getAllProblemes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/probleme/get/probleme`);
  }
  updateProbleme(problemeId: string, problemeData: any): Observable<any> {
    const url = `${this.baseUrl}/probleme/patch/probleme/${problemeId}`;
    return this.http.patch(url, problemeData);
  }
  deleteProbleme(problemeId: string): Observable<any> {
    const url = `${this.baseUrl}/probleme/delete/probleme/${problemeId}`;
    return this.http.delete(url);
  }
}
