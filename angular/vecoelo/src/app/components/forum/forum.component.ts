import { Component } from '@angular/core';
import { ForumService } from './forum.service';

@Component({
  selector: 'forum',
  templateUrl: 'forum.component.html',
  styleUrls: ['forum.component.css']
})
export class ForumComponent {
  constructor(private forumService: ForumService) { this.lastActivityDate = null; }
  searchText: string = '';
  filteredPosts: any[] = [];
  lastActivityDate: string | null;;

  get posts() {
    // Récupérer les publications du service
    const allPosts = this.forumService.getProblems();
  
    const sortedPosts = allPosts.sort((a, b) => {
      const lastActivityDateA = new Date(this.getLastActivityDate(a));
      const lastActivityDateB = new Date(this.getLastActivityDate(b));
      const publicationDateA = new Date(a.timestamp);
      const publicationDateB = new Date(b.timestamp);
  
      if (isNaN(lastActivityDateA.getTime())) {
        return 1; // Gérer le cas où la dernière activité de la publication A est invalide
      }
  
      if (isNaN(lastActivityDateB.getTime())) {
        return -1; // Gérer le cas où la dernière activité de la publication B est invalide
      }
  
      // Tri par la dernière activité
      if (lastActivityDateB.getTime() !== lastActivityDateA.getTime()) {
        return lastActivityDateB.getTime() - lastActivityDateA.getTime();
      }
  
      // Tri par la dernière publication si les dernières activités sont les mêmes
      return publicationDateB.getTime() - publicationDateA.getTime();
    });
  
    return sortedPosts;
  }
 
  deletePost(postId: string) {
    this.forumService.deletePost(postId);
  }
  filterPosts() {
    if (this.searchText) {
      this.filteredPosts = this.posts.filter(post =>
        post.objet.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (post.autreProbleme && post.autreProbleme.toLowerCase().includes(this.searchText.toLowerCase()))
      );
    } else {
      this.filteredPosts = this.posts;
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
      return ""; // Gérer le cas où dateTime est vide ou non défini
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
      return ""; // Gérer le cas où dateTime n'est pas une date valide
    }
    return formatter.format(date);
  }


}
