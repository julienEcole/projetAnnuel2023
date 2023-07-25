import { Component, OnInit } from '@angular/core';
import { ForumService } from './forum.service';

@Component({
  selector: 'forum',
  templateUrl: 'forum.component.html',
  styleUrls: ['forum.component.css']
})
export class ForumComponent implements OnInit {
  pseudo: string = '';
  mail: string = '';
  constructor(private forumService: ForumService) { }
  searchText: string = '';
  filteredPosts: any[] = [];
  posts: any[] = [];
  images: any[] = [];
  isRoleAllowedToDelete: boolean = true;

  ngOnInit(): void {
    this.loadPosts();
    const roleId = localStorage.getItem('roleUtilisateurId');
    this.isRoleAllowedToDelete = roleId === '3';
  }
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }
  
  loadPosts(): void {
    this.forumService.getProblems().subscribe(
      (response: any) => {
        if (Array.isArray(response.results)) {
          this.posts = response.results;
          for (const post of this.posts) {
            let id = post.utilisateur_id;
            post.image = this.arrayBufferToBase64(post.bin.data);
            this.forumService.getOneUserById(id).subscribe(
              (userResponse: any) => {
                const utilisateur = userResponse.results[0];
                post.pseudo = utilisateur.pseudo;
              },
              (error: any) => {
                console.log('Une erreur s\'est produite lors de la récupération des informations utilisateur :', error);
              }
            );
          }

          console.log('Chargement des publications réussi:', this.posts);
        } else {
          console.error('Erreur lors du chargement des publications: La réponse.results n\'est pas un tableau.', response);
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement des publications:', error);
        // Traitez l'erreur de chargement des publications si nécessaire
      }
    );
  }

  filterPosts() {
    if (this.searchText) {
      this.filteredPosts = this.posts.filter(post =>
        post.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        post.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  supprimerProbleme(problemeId: number) {
    console.log("Suppression du problème avec l'ID :", problemeId);

    if (confirm("Êtes-vous sûr de vouloir supprimer ce problème ?")) {
      this.forumService.deleteProbleme(problemeId.toString()).subscribe(
        (response: any) => {
          console.log('Problème supprimé');
          this.loadPosts();
        },
        (error: any) => {
          console.log("Une erreur s'est produite lors de la suppression du problème :", error);
        }
      );
    }
  }

  getLastActivityDate(post: any): string {
    const replies = post.replies;
    if (replies && replies.length > 0) {
      return replies[replies.length - 1].lastActivityDate;
    } else {
      return "Aucune activité";
    }
  }

  formatDateTime(dateTime: string): string {
    if (!dateTime) {
      return "";
    }

    const date = new Date(dateTime);
    date.setHours(date.getHours() + 2);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric' as const,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    if (isNaN(date.getTime())) {
      return "";
    }
    return formatter.format(date);
  }
}