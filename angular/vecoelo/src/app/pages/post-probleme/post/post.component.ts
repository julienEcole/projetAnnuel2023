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

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.postId = postId;
        this.post = this.forumService.getPostById(this.postId);
      }
    });
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
    return formatter.format(date);
  }
}