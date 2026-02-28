import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '@services/api/auth.service';

export const connectedGuard: CanActivateFn = (route, state) => {
// recupération du Token
    const storedUser: string | null = localStorage.getItem('apiToken');
// vérification de la présence d'un token, si oui, il est au minimum User
    if (storedUser) {
        return true
    }
    else {
        return false;
    }

};
