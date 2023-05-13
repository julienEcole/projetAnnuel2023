import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostProblemeComponent } from './post-probleme/post-probleme.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post-probleme', component: PostProblemeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
