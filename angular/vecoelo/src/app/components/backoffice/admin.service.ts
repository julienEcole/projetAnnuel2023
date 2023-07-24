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
  estRoleAdmin(): boolean {
    const role_utilisateur_id = Number(localStorage.getItem('roleUtilisateurId'));
    return role_utilisateur_id === 3;
  }  
  getUtilisateurById(id: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur/id/${id}`;
    return this.http.get(url);
  }
  getCommentsByPostId(postId: string): Observable<any[]> {
    const url = `${this.baseUrl}/commentaire/get/commentaire/idProbleme/${postId}`;
    return this.http.get<any[]>(url);
  }
  addCommentToPost(postId: string, comment: any): Observable<any> {
    const url = `${this.baseUrl}/commentaire/post/commentaire`;
    return this.http.post<any>(url, comment);
  }
  deleteCommentFromPost(commentaire_id: string): Observable<any> {
    const url = `${this.baseUrl}/commentaire/delete/commentaire/${commentaire_id}`;
    console.log('URL:', url);
    return this.http.delete<any>(url);
  }  
  getOneUserById(userId: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur/id/${userId}`;
    return this.http.get(url);
  }
}
