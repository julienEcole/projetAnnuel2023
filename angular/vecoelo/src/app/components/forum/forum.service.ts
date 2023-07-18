import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private STORAGE_KEY = 'forum_problems';
  private baseUrl = 'http://localhost:3999';
  constructor() {}

  getProblems(): any[] {
    const problems = localStorage.getItem(this.STORAGE_KEY);
    return problems ? JSON.parse(problems) : [];
  }

  getPostById(id: string): any {
    const problems = this.getProblems();
    return problems.find((post: any) => post.id === id);
  }

  addProblem(problem: any) {
    const problems = this.getProblems();
    problem.id = this.generateUniqueId();
    problems.push(problem);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(problems));
  }

  addReplyToPost(id: string, reply: any) {
    const problems = this.getProblems();
    const post = problems.find((p: any) => p.id === id);
    if (post) {
      if (!post.replies) {
        post.replies = [];
      }
      post.replies.push(reply);
      this.saveProblems(problems);
    }
  }

  deleteReplyFromPost(postId: string, reply: any) {
    const problems = this.getProblems();
    const post = problems.find(p => p.id === postId);
    if (post && post.replies) {
      const index = post.replies.findIndex((r: any) => r.message === reply.message);
      if (index !== -1) {
        post.replies.splice(index, 1);
        this.saveProblems(problems);
      }
    }
  }

  deletePost(postId: string) {
    const problems = this.getProblems();
    const index = problems.findIndex((post: any) => post.id === postId);
    if (index !== -1) {
      problems.splice(index, 1);
      this.saveProblems(problems);
    }
  }
  private saveProblems(problems: any[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(problems));
  }

  private generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}