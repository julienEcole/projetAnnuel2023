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
  getuser(): Observable<any[]> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur`;
    return this.http.get<any[]>(url);
  }
  getOneUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/get/utilisateur/id/${id}`;
    return this.http.get<any>(url);
  }
  getPostById(id: string): Observable<any> {
    return this.getProblems().pipe(
      map((problems: any[]) => problems.find((post: any) => post.id === id))
    );
  }

  addProblem(problem: any): void {
    this.getProblems().subscribe(problems => {
      console.log('Problems before adding:', problems);
      problems.push(problem);
      console.log('Problems after adding:', problems);
      this.saveProblems(problems);
    });
  }
  
  addReplyToPost(postId: string, reply: any): void {
    this.getProblems().subscribe(problems => {
      console.log('Problems before adding reply:', problems);
      const post = problems.find(p => p.id === postId);
      if (post) {
        if (!post.replies) {
          post.replies = [];
        }
        post.replies.push(reply);
        console.log('Problems after adding reply:', problems);
        this.saveProblems(problems);
      }
    });
  }
  
  deleteReplyFromPost(postId: string, reply: any): void {
    this.getProblems().subscribe(problems => {
      console.log('Problems before deleting reply:', problems);
      const post = problems.find(p => p.id === postId);
      if (post && post.replies) {
        const index = post.replies.findIndex((r: any) => r.message === reply.message);
        if (index !== -1) {
          post.replies.splice(index, 1);
          console.log('Problems after deleting reply:', problems);
          this.saveProblems(problems);
        }
      }
    });
  }
  
  deletePost(postId: string): void {
    this.getProblems().subscribe(problems => {
      console.log('Problems before deleting post:', problems);
      const index = problems.findIndex(post => post.id === postId);
      if (index !== -1) {
        problems.splice(index, 1);
        console.log('Problems after deleting post:', problems);
        this.saveProblems(problems);
      }
    });
  }
  
  private saveProblems(problems: any[]): void {
    console.log('Saving problems:', problems);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(problems));
  }
  
  private generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
