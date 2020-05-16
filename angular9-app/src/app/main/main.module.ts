import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


import { MainRoutes } from './main.routing';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryListComponent } from './categorylist/categorylist.component';
import { RemainderListComponent } from './remainderlist/remainderlist.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MainRoutes)  
  ],
  declarations: [
    HomeComponent,
    ProfileComponent ,
    CategoryListComponent  ,
    RemainderListComponent 
  ]
})

export class MainModule {}
