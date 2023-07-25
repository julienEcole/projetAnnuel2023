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
  ) { }

  UserID() {
    return localStorage.getItem('id');
  }

  submitProblem() {
    let id = localStorage.getItem('id');
    this.problem.utilisateur_id = id;
    console.log(this.problem.image);
    console.log(this.problem);
    this.submitImage(this.problem.image)
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
  submitImage(image: any = this.problem.image) {
    if (image) {
      const Images = {
        data: image.data,
        nom: image.name,
        taille: image.size,
        type: image.type,
      };
      console.log(Images.data)
      console.log("dataToSend = ", Images);
      // return this.http.post<any>(`${this.baseUrl}/probleme/post/probleme`, Images)
      //   .subscribe(
      //     response => {
      //       console.log("Résultat de la requête :", response);
      //     },
      //     error => {
      //       console.error("Erreur lors de la requête :", `${this.baseUrl}/probleme/post/probleme`, Images);
      //       console.error("Erreur lors de la requête :", error);
      //     }
      //   );
    }
    else {
      console.log("Pas d'image à envoyer");
      return;
    }
  }

  onChangeFile(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [imageFile] = event.target.files;
      console.log(imageFile);
      console.log(imageFile.data);
      if (imageFile.size > 2 * 1024 * 1024) {
        console.error('Image too large. Maximum size allowed is 2MB.');
        return;
      }
      reader.readAsDataURL(imageFile);

      reader.onload = () => {
        const imageDataURL = reader.result as string;
        console.log(imageDataURL);
        this.problem.image = {
          name: imageFile.name,
          type: imageFile.type,
          size: imageFile.size,
          data: imageDataURL,
        };
      };

    } else {
      this.problem.image = null;
    }
  }

}


