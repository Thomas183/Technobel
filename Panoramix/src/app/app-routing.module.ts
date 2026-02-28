import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {SettingsComponent} from "./features/settings/settings.component";
import { connectedGuard } from './core/guards/connected.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';

const routes: Routes = [
    {
        path: '', component: AppMainComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
            },
            {
                path: 'data',
                loadChildren: () => import('./features/data/data.module').then(m => m.DataModule), canActivate : [connectedGuard]
            },
            {
                path: 'report',
                loadChildren: () => import('./features/report/report.module').then(m => m.ReportModule), canActivate : [connectedGuard]
            },
            // Autres routes
            {
                path: 'settings',
                component: SettingsComponent, canActivate : [connectedGuard]
            },
            {
                path: 'dashboard',
                component: DashboardComponent, canActivate : [connectedGuard]
            },
            {
                path: 'denied',
                component: AppAccessdeniedComponent
            },
            {
                path: '',
                redirectTo:'/auth/login',
                pathMatch: "full",
            },
            {
                path : "**",
                component : AppNotfoundComponent
            },
        ]
    },
]


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: false})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
