import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {TokenInterceptorProvider} from "./core/interceptors/token.interceptor";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserModule} from './features/user/user.module';
import {HomeComponent} from './features/home/home.component';
import {SharedModule} from "./shared/shared.module";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {EventsModule} from './features/events/events.module';
import {CheckboxModule} from "primeng/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    SharedModule,
    ButtonModule,
    CardModule,
    EventsModule,
    CheckboxModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
