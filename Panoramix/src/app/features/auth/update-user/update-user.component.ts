import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/api/auth.service';
import {UserFormPatch} from '@models/api/users';
import {Password} from 'primeng/password';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

    // créations des choix pour le rôle
    dropdownItems: Array<{ role: string }> = [
        {role: 'USER'},
        {role: 'ADMIN'}
    ];

    userForm: FormGroup;
    userId: string;

    constructor(private _fb: FormBuilder,
                private _authService: AuthService,
                private _router: Router,
                private _ActiveRoute: ActivatedRoute) {

        this.userForm = this._fb.group({
            firstName: [null, [Validators.required],],
            lastName: [null, [Validators.required],],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],],
            role: ['USER'],
            isActivated: [true]
        });
        this.userId = this._ActiveRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this._authService.getById(this.userId).subscribe({
            next: (user) => {
                this.userForm.patchValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    email: user.email,
                });
            },
            error: () => {
                this._router.navigateByUrl('/notfound');
            }
        })
    }

    updateUser(): void {
        this._authService.updateUser(this.userId, this.userForm.value).subscribe();
    }
}
