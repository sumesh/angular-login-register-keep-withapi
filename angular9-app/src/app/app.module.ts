import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginLayoutComponent, MainLayoutComponent } from './_layout';
import { NoteComponent  } from './main/note/note.component';
import { CategoryComponent  } from './main/category/category.component';
import { RemainderComponent  } from './main/remainder/remainder.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { MatDividerModule } from '@angular/material/divider';
//import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    NoteComponent,
    CategoryComponent ,
    RemainderComponent
  ],
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    //LoginLayoutComponent,
    //MainLayoutComponent,
   // AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [
    NoteComponent,
    CategoryComponent,
    RemainderComponent
  ],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
