import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { last } from 'rxjs';
import { ForumService } from 'src/app/components/forum/forum.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postId!: string;
  post: any;
  replyMessage!: string;
  posts: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {}

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
  submitReply() {
    const reply = {
      message: this.replyMessage,
      timestamp: new Date(),
      lastActivityDate: new Date(),
      auteur: localStorage.getItem('pseudo') || 'Anonyme'
    };
    
    this.forumService.addReplyToPost(this.postId, reply);
    this.replyMessage = ''; 
    window.location.reload();
  }
  
  deleteReply(reply: any) {
    this.forumService.deleteReplyFromPost(this.postId, reply);
    this.post.replies = this.post.replies.filter((r: any) => r.message !== reply.message);
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