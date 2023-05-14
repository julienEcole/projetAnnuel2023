import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostProblemeComponent } from './pages/post-probleme/post-probleme.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'post-probleme', component: PostProblemeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
