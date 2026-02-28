import { Component } from '@angular/core';
import {AuthService} from "@services/api/auth.service";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
    providers: [MessageService],
})
export class RecoverPasswordComponent {

    email: string = '';
    messages: Array<Message> = [
        {severity: 'warn', summary: 'Attention', detail: "E-mail incorrecte"}, // 0
        {severity: 'success', summary: 'Attention', detail: "E-mail envoyé, veuillez vérifier votre boite de réception"}, // 1
        {severity: 'warn', summary: 'Attention', detail: "Erreur lors de l'envoi de l'email"}, // 2
    ]
    mailRegEx: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    constructor(private _auth: AuthService,private _messageService: MessageService) {
    }

    displayMessage(message: number){
        this._messageService.add(this.messages[message])

        setTimeout(() => {
            this._messageService.clear();
        }, 3500)
    }

    sendRecoverMail(){
        if (!this.mailRegEx.test(this.email)){
            this.displayMessage(0);
            return
        }
        this._auth.recoverPassword(this.email).subscribe({
            next: () => {
                this.displayMessage(1);
            },
            error: () => {
                this.displayMessage(2);
            }
        })
    }

}
