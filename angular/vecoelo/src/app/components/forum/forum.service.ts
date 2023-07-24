import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private STORAGE_KEY = 'forum_problems';
  private baseUrl = 'http://localhost:3999';
  dateInscription: string = '';
  modifierProfil: boolean = false;
  joursInscription: number = 0;
  pseudo: string = '';
  mail: string = '';
  pseudoModifie: string = '';
  mailModifie: string = '';
  passwordModifie: string = '';

  constructor(private http: HttpClient) { }

  getProblems(): Observable<any[]> {
    const url = `${this.baseUrl}/probleme/get/probleme`;
    return this.http.get<any[]>(url);
  }
  getOneProblemeById(id: string): Observable<any> {
    const url = `${this.baseUrl}/probleme/get/probleme/${id}`;
    return this.http.get(url);
  }
  getuser(): Observable<any[]> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur`;
    return this.http.get<any[]>(url);
  }
  getOneUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur/id/${id}`;
    return this.http.get<any>(url);
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
  addProblem(problem: any): void {
    problem.id = localStorage.getItem('id');
    problem.pseudo = localStorage.getItem('pseudo');
    this.getProblems().subscribe(problems => {
      // problems.push(problem);
      this.saveProblems(problems);
    });
    
  }

  deleteProbleme(problemeId: string): Observable<any> {
    const url = `${this.baseUrl}/probleme/delete/probleme/${problemeId}`;
    return this.http.delete(url);
  }

  private saveProblems(problems: any[]): void {
    console.log('Saving problems:', problems);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(problems));
  }

  private generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
