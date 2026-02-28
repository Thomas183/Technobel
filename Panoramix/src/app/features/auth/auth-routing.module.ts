import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUserComponent} from "./create-user/create-user.component";
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {LoginComponent} from "./login/login.component";
import {UpdateUserComponent} from './update-user/update-user.component';
import {adminGuard} from 'src/app/core/guards/admin.guard';
import {connectedGuard} from 'src/app/core/guards/connected.guard';
import {RecoverPasswordComponent} from "./recover-password/recover-password.component";
import * as path from "path";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
    {
        path: 'createUser',
        component: CreateUserComponent, canActivate: [adminGuard]
    },
    {
        path: 'manageUsers',
        component: ManageUsersComponent, canActivate: [adminGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'changePassword/:token',
        component: ChangePasswordComponent
    },
    {
        path: 'recoverPassword',
        component: RecoverPasswordComponent
    },
    {
        path: 'updateUser/:id',
        component: UpdateUserComponent, canActivate: [connectedGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
