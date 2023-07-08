import { Component } from '@angular/core';
import { ForumService } from 'src/app/components/forum/forum.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/login/user.service';

@Component({
  selector: 'app-post-probleme',
  templateUrl: './post-probleme.component.html',
  styleUrls: ['./post-probleme.component.css']
})
export class PostProblemeComponent {
  
  problem: any = {
    objet: '',
    autreProbleme: '',
    image: '',
    resume: '',
    date: new Date(),
    auteur: this.userService.utilisateurConnecte?.pseudo || "anonymous",
  };

  constructor(
    private forumService: ForumService,
    private router: Router,
    private userService: UserService
  ) {}

  submitProblem() {
    const utilisateurConnecte = this.userService.utilisateurConnecte;
    if (utilisateurConnecte) {
      this.problem.auteur = utilisateurConnecte.pseudo;
    }
    
    this.forumService.addProblem(this.problem);
    this.router.navigate(['/forum']);
  }

  onFileChange(event: any) {
    // Logique pour gérer le changement de fichier
  }
}
