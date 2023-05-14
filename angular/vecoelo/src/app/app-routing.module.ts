import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostProblemeComponent } from './pages/post-probleme/post-probleme.component';
import { ReparateurProcheComponent } from './pages/reparateur-proche/reparateur-proche.component';
import { ForumComponent } from './components/forum/forum.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'post-probleme', component: PostProblemeComponent },
  { path: 'reparateur-proche', component: ReparateurProcheComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
