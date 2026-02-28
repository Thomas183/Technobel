import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../../core/models/credentials';


@Component({
  selector: 'app-log-on',
  templateUrl: './log-on.component.html',
  styleUrls: ['./log-on.component.sass']
})
export class LogOnComponent {

  loginForm: FormGroup;

  constructor(public _router: Router, private Auth: AuthService, private _fb: FormBuilder) {
    this.loginForm = _fb.group({
      identifier: [null, [Validators.required], []],
      password: [null, [Validators.required], []]
    });
  }

  login() : void {
    console.log(this.loginForm.get('identifier')?.value, this.loginForm.get('password')?.value)
    if (this.loginForm.valid) {
      const credentials : Credentials = this.loginForm.value;
      this.Auth.login(credentials);
      this._router.navigate(['home']);
    } else {
      console.log('Login form invalide');
    }
  }
}
