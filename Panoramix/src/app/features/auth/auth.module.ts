import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {CreateUserComponent} from "./create-user/create-user.component";
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {DropdownModule} from "primeng/dropdown";
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import {MessagesModule} from "primeng/messages";

@NgModule({
    declarations: [
        LoginComponent,
        CreateUserComponent,
        ManageUsersComponent,
        UpdateUserComponent,
        ChangePasswordComponent,
        RecoverPasswordComponent,

    ],
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        DropdownModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        TableModule,
        MessagesModule,
        FormsModule
    ],
    exports: [
        ReactiveFormsModule
    ]

})
export class AuthModule {
}
