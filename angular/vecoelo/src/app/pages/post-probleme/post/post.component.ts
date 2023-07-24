import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isRoleAllowedToComment: boolean = true; 
  isRoleAllowedToDelete: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private router: Router
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
            console.log(localStorage.getItem('id'));
            const roleId = localStorage.getItem('roleUtilisateurId'); // Utilisez la clé "role_utilisateur_id"
            this.isRoleAllowedToComment = roleId !== '2';
            this.isRoleAllowedToDelete = roleId == '3';

          });
          this.loadComments(); 
        });
      }
    });
  }
  loadAuthor(id: string) {
    this.forumService.getOneUserById(id).subscribe(user => {
      this.post.pseudo = user.results[0].pseudo;
      this.post.utilisateur_id = user.results[0].utilisateur_id; // Utilisez la clé "utilisateur_id"
      console.log("ID de l'utilisateur :", this.post.utilisateur_id); // Vérifiez l'ID de l'utilisateur
    });
  }  

  redirigerVersProfil() {
    console.log("Redirection vers le profil de l'utilisateur :", this.post.utilisateur_id);
    if (this.post && this.post.utilisateur_id) {
      this.router.navigate(['/profil_user', this.post.utilisateur_id]);
    }
  }

  redirigerVersProfilUtilisateur(userId: string) {
    console.log("Redirection vers le profil de l'utilisateur :", userId);
    if (userId) {
      this.router.navigate(['/profil_user', userId]);
    }
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
    // Vérifiez à nouveau le rôle ID avant d'ajouter un commentaire
    const roleId = localStorage.getItem('role_utilisateur_id');
    console.log("ID du rôle de l'utilisateur :", roleId);
    if (roleId === '2') {
      console.log("Vous n'êtes pas autorisé à ajouter un commentaire avec ce rôle.");
      return; // Arrêtez l'exécution de la fonction si l'utilisateur a le rôle ID 2
    }

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

  deleteComment(commentaire_id: string) {
    console.log('Commentaire à supprimer:', commentaire_id);
    this.forumService.deleteCommentFromPost(commentaire_id).subscribe(() => {
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
