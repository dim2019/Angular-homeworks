import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InterceptorService } from './services/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatNativeDateModule
    
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
