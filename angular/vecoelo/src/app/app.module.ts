import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import du module FormsModule

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostProblemeComponent } from './pages/post-probleme/post-probleme.component';
import { ReparateurProcheComponent } from './pages/reparateur-proche/reparateur-proche.component';
import { AppRoutingModule } from './app-routing.module';
import { ForumComponent } from './components/forum/forum.component';
import { ConnexionComponent } from './components/login/connexion/connexion.component';
import { InscriptionComponent } from './components/login/inscription/inscription.component';
import { PostComponent } from './pages/post-probleme/post/post.component';
import { ProfilUserComponent } from './components/profil/profil-user/profil-user.component';
import { ProfilReparateurComponent } from './components/profil/profil-reparateur/profil-reparateur.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/backoffice/admin/admin.component';
import { AdminService } from './components/backoffice/admin.service';


document.addEventListener("DOMContentLoaded", () => {
  let footer = document.querySelector("header footer");
  if (footer) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    footer.innerHTML = `Véco-Elo - Trouvez les meilleurs réparateurs de vélos près de chez vous. © ${currentYear}`;
  }
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostProblemeComponent,
    ReparateurProcheComponent,
    AppComponent,
    HomeComponent,
    ForumComponent,
    ConnexionComponent,
    InscriptionComponent,
    PostComponent,
    ProfilUserComponent,
    ProfilReparateurComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Ajout du module FormsModule
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


