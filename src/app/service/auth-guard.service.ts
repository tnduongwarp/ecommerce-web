import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('accessToken') || state.url === '/' || state.url.startsWith('/login') || state.url.startsWith('/register')) {
        return true;
    } else {
      return (this.router.navigate(['/login']), false)
    }


  }
}
