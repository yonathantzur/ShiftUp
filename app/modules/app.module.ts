import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from '../components/app/app.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';

// Routing
import { Routing } from '../routes/app.routing'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }