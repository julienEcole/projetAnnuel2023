import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './velo_animation/velo_animation.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get<any>('http://localhost:3999/utilisateur/get/utilisateur').subscribe(
    //   response => {
    //     console.log("Résultat de la requête :", response);
    //   },
    //   error => {
    //     console.error("Erreur lors de la requête :", error);
    //   }
    // );
  }
}
