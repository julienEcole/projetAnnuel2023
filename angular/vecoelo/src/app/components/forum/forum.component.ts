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

  posts: any[] = [];

  ngOnInit(): void {

    this.loadPosts();
  }

  loadPosts(): void {
    this.forumService.getProblems().subscribe(
      (response: any) => {
        if (Array.isArray(response.results)) {
          this.posts = response.results;
  
          for (const post of this.posts) {
            let id = post.utilisateur_id;
  
            this.forumService.getOneUserById(id).subscribe(
              (userResponse: any) => {
                const utilisateur = userResponse.results[0];
                post.pseudo = utilisateur.pseudo;
                console.log('Chargement des réponses du post:', post);
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
  



  deletePost(postId: string): void {
    this.forumService.deletePost(postId);
    this.loadPosts();
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