import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
class AuthGuard {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const accessToken = localStorage.getItem('access-token');
    if (!accessToken || accessToken == '') {
      this.router.navigate(['/auth/login']);
    }
    return accessToken && accessToken !== '';

  }
}
  export const isAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuard).canActivate(route, state)
  }
