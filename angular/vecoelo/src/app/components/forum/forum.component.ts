import { Component } from '@angular/core';
import { ForumService } from './forum.service';

@Component({
  selector: 'forum',
  templateUrl: 'forum.component.html',
  styleUrls: ['forum.component.css']
})

export class ForumComponent {
  constructor(private forumService: ForumService) {}

  get posts() {
    return this.forumService.getProblems();
  }
}
