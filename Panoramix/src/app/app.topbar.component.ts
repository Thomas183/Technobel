import { Component } from '@angular/core';
import { AppComponent} from './app.component';
import { AppMainComponent} from './app.main.component';
import { AuthService } from '@services/api/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppComponent, public appMain: AppMainComponent,private _authService: AuthService) {}

    disconnect() {
      this._authService.logout()
      }
}
