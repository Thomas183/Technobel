import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule
  ]
})
export class SharedModule {
}
