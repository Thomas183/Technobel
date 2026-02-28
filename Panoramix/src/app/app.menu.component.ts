import { Component, OnInit } from "@angular/core";
import { AuthService } from "@services/api/auth.service";

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;"
                [item]="item" [index]="i" [visible]="true" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    constructor(private _authService: AuthService) {
    }

    model: any[];

    private _isAdminConnected: boolean = false;
    private _isUserConnected: boolean = false;

    setMenuItems(): void {
        this.model = [
            {
                label: 'Acceuil', icon: 'pi pi-fw pi-home', visible: this._isUserConnected,
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard'] },
                ]
            },
            {
                label: 'Utilisateurs',
                icon: 'pi pi-fw pi-star-fill',
                routerLink: ['/auth'],
                // visible: this._isAdminConnected,
                visible: this._isAdminConnected,
                items: [
                    { label: 'Créer un utilisateur', icon: 'pi pi-fw pi-id-card', routerLink: ['auth/createUser'] },
                    { label: 'Gérer les utilisateurs', icon: 'pi pi-fw pi-users', routerLink: ['auth/manageUsers'] },
                    // { label: 'Login Page (Testing)', icon: 'pi pi-fw pi-sign-in', routerLink: ['auth/login'] },
                ]
            },
            {
                label: 'Bienvenue',
                icon: 'pi pi-fw pi-star-fill',
                routerLink: ['/auth'],
                visible: !this._isUserConnected,
                items: [
                    { label: 'Login Page', icon: 'pi pi-fw pi-sign-in', routerLink: ['auth/login'] },
                ]
            },
            {
                label: 'Rapports', icon: 'pi pi-fw pi-prime', routerLink: ['/report'], visible: this._isUserConnected,
                items: [
                    { label: 'Créer un nouveau rapport', icon: 'pi pi-fw pi-plus', routerLink: ['report/createReport'] },
                    { label: 'Mes Rapports', icon: 'pi pi-fw pi-eye', routerLink: ['report/myReports'] },
                    {
                        label: 'Explorer les rapports',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['report/exploreReports']
                    },
                ]
            },
            {
                label: 'Données', icon: 'pi pi-fw pi-compass', routerLink: ['/data'], visible: this._isUserConnected,
                items: [
                    { label: 'Importer des données', icon: 'pi pi-fw pi-file-import', routerLink: ['data/importData'] },
                    { label: 'Explorer les données', icon: 'pi pi-fw pi-list', routerLink: ['data/exploreData'] },
                ]
            },
            {
                label: 'Autres', icon: 'pi pi-fw pi-copy', visible: this._isUserConnected,
                items: [
                    { label: 'Paramètres', icon: 'pi pi-fw pi-cog', routerLink: ['settings'] },
                ]
            },
        ];
    }


    ngOnInit(): void {
        this.setMenuItems();
        // const user: string | undefined = undefined;
        const storedUser: string | null = localStorage.getItem('apiToken');

        if (storedUser) {
            const decodedPayload: string = atob(storedUser.split('.')[1]);
            const parsedPayload: any = JSON.parse(decodedPayload);



            if (parsedPayload.role === 'ADMIN') {
                this._isAdminConnected = true;
                this._isUserConnected = true;

                this.setMenuItems();
            }
            else if (parsedPayload.role === 'USER') {
                this._isAdminConnected = false;
                this._isUserConnected = true;

                this.setMenuItems();
            }
            else {
                this._isAdminConnected = false;
                this._isUserConnected = false;

                this.setMenuItems();
            }
        }}}
