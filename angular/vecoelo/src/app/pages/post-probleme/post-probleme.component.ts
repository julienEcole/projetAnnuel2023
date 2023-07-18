import { Component } from '@angular/core';
import { ForumService } from 'src/app/components/forum/forum.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-probleme',
  templateUrl: './post-probleme.component.html',
  styleUrls: ['./post-probleme.component.css']
})
export class PostProblemeComponent {
  private baseUrl = 'http://localhost:3999';
  problem: any = {
    objet: '',
    autreProbleme: '',
    image: '',
    resume: '',
    adresse: '',
    date: new Date(),
    auteur: localStorage.getItem('pseudo') || 'Anonyme'

  };

  constructor(
    private forumService: ForumService,
    private router: Router,
    private http: HttpClient
  ) {}
  
  UserID() {
    return localStorage.getItem('id');
  }

  submitProblem() {
    this.forumService.addProblem(this.problem);
    console.log(this.problem);
    return this.http.post<any>(`${this.baseUrl}/probleme/post/probleme`, this.problem)
      .subscribe(
        response => {
          console.log("Résultat de la requête :", response);
          this.router.navigate(['/forum']);
        },
        error => {
          console.error("Erreur lors de la requête :", `${this.baseUrl}/probleme/post/probleme`, this.problem);
          console.error("Erreur lors de la requête :", error);
        }
      );
    
  }

  onFileChange(event: any) {
    // Logique pour gérer le changement de fichier
  }
}
