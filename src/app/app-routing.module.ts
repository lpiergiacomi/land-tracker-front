import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {isAuthGuard} from "./auth/auth-guard";
import {isLoggedGuard} from "./auth/logged-guard";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [isAuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [isLoggedGuard]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

