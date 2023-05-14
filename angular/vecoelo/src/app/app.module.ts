import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import du module FormsModule

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostProblemeComponent } from './pages/post-probleme/post-probleme.component';
import { ReparateurProcheComponent } from './pages/reparateur-proche/reparateur-proche.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostProblemeComponent,
    ReparateurProcheComponent,
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Ajout du module FormsModule
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


