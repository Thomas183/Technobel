import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {AppMainComponent} from './app.main.component';
import { User } from '@models/api/users';
import { AuthService } from '@services/api/auth.service';

@Component({
    selector: 'app-inline-profile',
    templateUrl: './app.profile.component.html',
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px',
                paddingBottom: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent {

    active: boolean;
    connectedUser : User | undefined


    constructor(public appMain: AppMainComponent,
        private _authService : AuthService) { }

    onClick(event) {
        this.appMain.onInlineMenuClick(event);
        event.preventDefault();
    }



    ngOnInit(): void {
        this._authService.getConnectedUser().subscribe({
            next: (user) => {
                this.connectedUser = user
            }
        })

        // this.authService.$connectedUser.subscribe({
        //   next : (value) => {
        //     this.connectedUser = value;
        //     this._authService.getById(value.id);
        //
        //   },
        // })
      }
}
