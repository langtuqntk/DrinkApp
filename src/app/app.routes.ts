import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { DALoginComponent } from './@theme/components';
import { AuthGuard } from './@core/guards';
import { NoContentComponent } from './@theme/components';

const routes: Routes = [
  { path: '', loadChildren: './pages#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: DALoginComponent,
      },
      {
        path: 'login',
        component: DALoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent, canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', component: NoContentComponent },
];

// const config: ExtraOptions = {
//   useHash: true,
// };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
