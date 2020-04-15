import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./public/home/home.module').then(m => m.HomeModule) },
    { path: 'admin/login', loadChildren: () => import('./public/admin-login/admin-login.module').then(m => m.AdminLoginModule) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    { path: 'login', loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./public/signup/signup.module').then(m => m.SignupModule) },
    // tslint:disable-next-line:max-line-length
    { path: 'forgot-password', loadChildren: () => import('./public/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
    { path: 'error', loadChildren: () => import('./errors/server-error/server-error.module').then(m => m.ServerErrorModule) },
    { path: 'access-denied', loadChildren: () => import('./errors/access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
    { path: 'not-found', loadChildren: () => import('./errors/not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
