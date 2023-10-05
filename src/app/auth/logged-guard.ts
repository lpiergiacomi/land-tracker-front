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
class LoggedGuard {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken && accessToken !== '') {
      this.router.navigate(['/pages/lotes/mapa']);
    }
    return !accessToken || accessToken == '';

  }
}
  export const isLoggedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(LoggedGuard).canActivate(route, state)
  }
