import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/login/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  baseUrl = 'http://localhost:3999';
  dateInscription: string = '';
  modifierProfil: boolean = false;
  joursInscription: number = 0;
  pseudo: string = '';
  mail: string = '';
  password: string = '';
  roleUser: string = '';
  telephone: string = '';
  utilisateur_id: string = '';
  image: any = '';
  userId: string = '';
  pseudoModifie: string = '';
  mailModifie: string = '';
  passwordModifie: string = '';
  roleUtilisateurId: number = 0;
  userIdConnected: number = 0;
  roleAdmin: number = 0;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  get nomUtilisateurConnecte(): string | null {
    return this.userService.getNomUtilisateurConnecte();
  }

  ngOnInit(): void {
    this.pseudo = '';
    this.mail = '';
    this.utilisateur_id = '';
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      // Récupérer les informations de l'utilisateur à partir de l'id
      this.userService.getOneUserById(userId).subscribe(
        (response: any) => {
          const utilisateur = response.results[0];
          this.pseudo = utilisateur.pseudo;
          this.mail = utilisateur.mail;
          this.telephone = utilisateur.telephone;
          this.utilisateur_id = utilisateur.utilisateur_id;
          this.image = utilisateur.bin;
          if (this.arrayBufferToBase64(this.image.data) == "undefined" || this.arrayBufferToBase64(this.image.data) == "") {
            this.image = "https://cdn-icons-png.flaticon.com/512/3607/3607444.png";
          } else {
            this.image = this.arrayBufferToBase64(this.image.data);
            console.log(this.image);
          }
          //Savoir si l'id de l'utilisateur connecté est le même que celui de l'utilisateur dont on consulte le profil
          this.userId = localStorage.getItem('id') || '';
          this.roleUtilisateurId = utilisateur.role_utilisateur_id;

          // Calcul du nombre de jours d'inscription en utilisant la date actuelle
          this.dateInscription = utilisateur.date_de_publication;
          const dateInscription = new Date(this.dateInscription);
          const currentDate = new Date();
          const timeDiff = Math.abs(currentDate.getTime() - dateInscription.getTime());
          this.joursInscription = Math.ceil(timeDiff / (1000 * 3600 * 24));
        },
        (error: any) => {
          console.log('Une erreur s\'est produite lors de la récupération des informations utilisateur :', error);
        }
      );
    });
  }
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }
  isAdmin(): boolean {
    this.roleAdmin = parseInt(localStorage.getItem('roleUtilisateurId') || '0');

    if (this.roleUtilisateurId == 3) {

      return true;
    }
    return false;
  }
  ifUser(): boolean {
    if (this.userId == this.utilisateur_id) {
      return true;
    }
    return false;
  }
  formatDateTime(dateTime: string): string {
    if (!dateTime) {
      return ""; // Gérer le cas où dateTime est vide ou non défini
    }

    const date = new Date(dateTime);
    date.setHours(date.getHours() + 2);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric' as const,
    };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    if (isNaN(date.getTime())) {
      return ""; // Gérer le cas où dateTime n'est pas une date valide
    }
    return formatter.format(date);
  }
  deleteProfil(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.deleteOneUserById(userId).subscribe(
        (response: any) => {
          console.log('Utilisateur supprimé');
          localStorage.clear();
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.log("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        }
      );
    };
  }
  changerProfil(): void {
    if (!this.modifierProfil) {
      this.modifierProfil = true;
    }
    else {
      if (this.pseudo && this.mail) {

        const userId = localStorage.getItem('id');

        if (userId) {
          const updatedUserData = {
            password: this.password,
            mail: this.mail,
            pseudo: this.pseudo,
            telephone: this.telephone,
            image: this.image,
          };

          this.userService.updateUser(userId, updatedUserData).subscribe(
            response => {
              console.log('Mise à jour effectuée avec succès', response);

            },
            error => {
              console.error("Erreur lors de la requête :", `${this.baseUrl}/utilisateur/patch/utilisateur/${userId}`, updatedUserData);
              console.error('Erreur lors de la mise à jour', error);
            }
          );
        } else {
          console.log('ID utilisateur non trouvé dans le localStorage');
        }
      } else {
        // Afficher un message d'erreur ou effectuer d'autres actions nécessaires
        console.log('Veuillez remplir tous les champs de modification');
      }
    }
  }
  onChangeFile(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [imageFile] = event.target.files;
      console.log(imageFile);

      if (imageFile.size > 2 * 1024 * 1024) {
        console.error('Image too large. Maximum size allowed is 2MB.');
        return;
      }

      reader.readAsDataURL(imageFile);

      reader.onload = () => {
        const imageDataURL = reader.result as string;
        console.log(imageDataURL);

        // Update the user object with the new image data
        this.image = {
          name: imageFile.name,
          type: imageFile.type,
          size: imageFile.size,
          data: imageDataURL,
        };
      };
    } else {
      this.image = null;
    }
  }
}