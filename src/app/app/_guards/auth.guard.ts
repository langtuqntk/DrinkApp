import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: NbAuthService) { }

    canActivate() {
        return this.authService.isAuthenticated()
            .do(authenticated => {
                console.log(authenticated);
                if (!authenticated) {
                    console.log('vao day');
                    this.router.navigate(['auth/login']);
                }
            });
    }
}
