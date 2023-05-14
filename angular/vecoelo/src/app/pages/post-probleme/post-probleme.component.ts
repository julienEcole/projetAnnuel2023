import { Component } from '@angular/core';

@Component({
  selector: 'app-post-probleme',
  templateUrl: './post-probleme.component.html',
  styleUrls: ['./post-probleme.component.css']
})
export class PostProblemeComponent {
  probleme: string; // Déclaration de la propriété probleme

  constructor() {
    this.probleme = ''; // Assigner une valeur à la propriété probleme dans le constructeur
  }

  submitForm() {
    // Logique de soumission du formulaire
    console.log(this.probleme); // Utilisation de la propriété probleme
  }
  
  onFileChange(event: any) {
    // Logique pour gérer le changement de fichier
  }
}
