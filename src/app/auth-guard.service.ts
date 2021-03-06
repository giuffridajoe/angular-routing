import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService,
                private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot,
                //  Observable and Promise objs run asyncroniously, boolean is syncronous
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                    return this.authService.isAuthenticated()
                        .then(
                            (authenticated: boolean) => {
                                if (authenticated) {
                                    return true;
                                } else {
                                    this.router.navigate(['/']);
                                }
                            }
                        );
    }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            // this  allows us to guard against unauthorized redirects to child components
            return this.canActivate(route, state);
    }

}