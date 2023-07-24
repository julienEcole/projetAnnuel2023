import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './velo_animation/velo_animation.scss']
})
export class HomeComponent implements OnInit {
  isRoleAllowedToPostProblem: boolean = true; // Initialize the flag

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const roleId = +(localStorage.getItem('roleUtilisateurId') ?? '1');
    this.isRoleAllowedToPostProblem = roleId !== 2;
  }
}
