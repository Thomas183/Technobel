import { Component } from '@angular/core';
import { User } from '@models/api/users';
import { AuthService } from '@services/api/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  connectedUser : User | undefined;

  constructor(private _authService: AuthService) { }

    logout(){
      this._authService.logout();
    }

    protected readonly localStorage = localStorage;
}
