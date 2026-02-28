import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '@services/api/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
    // recupération du Token
    const storedUser: string | null = localStorage.getItem('apiToken');

    // extraction du rôle à partir du Token
    const decodedPayload: string = atob(storedUser.split('.')[1]);
    const parsedPayload: any = JSON.parse(decodedPayload);

    // vérification du rôle : Admin ?
    if (parsedPayload && parsedPayload.role === 'ADMIN') {
        return true
    }
    else {
        return false;
    }
};
