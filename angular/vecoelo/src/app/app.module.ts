import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import du module FormsModule

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostProblemeComponent } from './post-probleme/post-probleme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostProblemeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Ajout du module FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
