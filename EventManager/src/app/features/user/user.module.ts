import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LogOnComponent } from './log-on/log-on.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    RegisterComponent,
    LogOnComponent
  ],
  exports: [
    RegisterComponent,
    LogOnComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    PasswordModule
  ]
})
export class UserModule { }
