import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { SearchBarComponent } from './ui/search-bar/search-bar.component';
import { MoviesContainerComponent } from './ui/movies-container/movies-container.component';
import { FooterComponent } from './ui/footer/footer.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, SearchBarComponent, MoviesContainerComponent, FooterComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
