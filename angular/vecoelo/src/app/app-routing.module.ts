import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostProblemeComponent } from './pages/post-probleme/post-probleme.component';
import { ReparateurProcheComponent } from './pages/reparateur-proche/reparateur-proche.component';
import { ForumComponent } from './components/forum/forum.component';
import { ConnexionComponent } from './components/login/connexion/connexion.component';
import { InscriptionComponent } from './components/login/inscription/inscription.component';
import { PostComponent } from './pages/post-probleme/post/post.component';
import { ProfilReparateurComponent } from './components/profil/profil-reparateur/profil-reparateur.component';
import { ProfilUserComponent } from './components/profil/profil-user/profil-user.component';
import { AdminComponent } from './components/backoffice/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'post-probleme', component: PostProblemeComponent },
  { path: 'reparateur-proche', component: ReparateurProcheComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'post/:id', component: PostComponent },
  { path: '', redirectTo: '/forum', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'profil_user/:id', component: ProfilUserComponent },
  { path: 'profil-reparateur/:id', component: ProfilReparateurComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
