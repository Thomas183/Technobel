import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;



  menuItems: MenuItem[];
  constructor(private _authService: AuthService, private _router: Router, private cdRef : ChangeDetectorRef) {
    this.menuItems = this.loadMenuItems()

    this._authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.menuItems = this.loadMenuItems()
    })
  }

  loadMenuItems(): MenuItem[] {
    return [
      {
        label: "Acceuil",
        routerLink: "home",
      },
      {
        label: "Événements",
        items: [
          {
            label: "Événements à venir",
            routerLink: "events"
          },
          {
            label: "Mes événements",
            routerLink: "userEvents",
            disabled: !this.isLoggedIn
          },
          {
            label: "Créer un événement",
            routerLink: "createEvent",
            disabled: !this.isLoggedIn
          }
        ]
      },
    ]
  }

  logout(): void {
    this._authService.logOut();
    this._router.navigate(['home'])
  }


}
