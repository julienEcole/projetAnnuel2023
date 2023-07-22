import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.postId = postId;
        this.forumService.getOneProblemeById(this.postId).subscribe(post => {
          this.post = post.results[0];
          this.forumService.getOneUserById(this.postId).subscribe(user => {
            this.post = post.results[0];
            this.loadAuthor(this.post.utilisateur_id);

          });
          this.loadComments(); 
        });
      }
    });
  }
  loadAuthor(id: string) {
    this.forumService.getOneUserById(id).subscribe(user => {
      this.post.pseudo = user.results[0].pseudo;
    });
  }
  loadComments() {
    this.forumService.getCommentsByPostId(this.postId).subscribe((comments: any) => {
      if (Array.isArray(comments.results)) { // Vérifier si comments.results est un tableau
        this.comments = comments.results;
        for (const comment of this.comments) {
          this.forumService.getOneUserById(comment.utilisateur_id).subscribe(user => {
            comment.pseudo = user.results[0].pseudo;
          });
        }
      } else {
        console.error('Erreur lors du chargement des commentaires: La réponse.results n\'est pas un tableau.', comments);
      }
    });
  }

  submitReply() {
    const comment = {
      description: this.replyMessage,
      probleme_id: this.postId,
      utilisateur_id: localStorage.getItem('id')
    };
    console.log('Commentaire à ajouter:', comment);
    this.forumService.addCommentToPost(this.postId, comment).subscribe(() => {
      this.loadComments();
    });
    this.replyMessage = '';
  }

  deleteComment(commentId: string) {
    this.forumService.deleteCommentFromPost(commentId).subscribe(() => {
      this.loadComments();
    });
  }

  formatDateTime(dateTime: string): string {
    if (!dateTime) {
      return '';
    }
    const date = new Date(dateTime);
    date.setHours(date.getHours() + 2); // Réglez l'heure en fonction de votre décalage horaire.
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    if (isNaN(date.getTime())) {
      return '';
    }
    return formatter.format(date);
  }
}
