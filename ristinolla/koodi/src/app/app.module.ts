import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, BoardComponent, SquareComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, BoardComponent, SquareComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
