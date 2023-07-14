import { Component } from '@angular/core';
import { ForumService } from 'src/app/components/forum/forum.service';
import { Router } from '@angular/router';

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
    auteur: localStorage.getItem('pseudo') || 'Anonyme'
  };

  constructor(
    private forumService: ForumService,
    private router: Router
  ) {}

  submitProblem() {
    this.forumService.addProblem(this.problem);
    this.router.navigate(['/forum']);
  }

  onFileChange(event: any) {
    // Logique pour gérer le changement de fichier
  }
}
