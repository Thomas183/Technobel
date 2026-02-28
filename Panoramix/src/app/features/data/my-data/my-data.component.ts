import { Component } from '@angular/core';
import { AuthService } from '@services/api/auth.service';
import { User } from '@models/api/users';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent {
  connectedUser : User | undefined;

  constructor(private _authService: AuthService) { }

  
}
