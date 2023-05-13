import { Component } from '@angular/core';

@Component({
  selector: 'app-post-probleme',
  templateUrl: './post-probleme.component.html',
  styleUrls: ['./post-probleme.component.css']
})
export class PostProblemeComponent {
  probleme: string = '';

  onFileChange(event: any) {
    // Logique de gestion du changement de fichier ici
    const file = event.target.files[0];
    console.log('Fichier sélectionné :', file);
    // Ajoutez d'autres traitements nécessaires
  }

  submitForm() {
    console.log('Formulaire soumis !');
    console.log('Problème :', this.probleme);
    // Ajoutez ici la logique de traitement du formulaire
  }
}
