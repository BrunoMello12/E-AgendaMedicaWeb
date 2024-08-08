import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./views/medicos/medicos.module').then(
        (m) => m.MedicosModule
      ),
      canActivate: [authGuard],
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./views/consultas/consultas.module').then(
        (m) => m.ConsultasModule
      ),
      canActivate: [authGuard],
  },
  {
    path: 'cirurgias',
    loadChildren: () =>
      import('./views/cirurgias/cirurgias.module').then(
        (m) => m.CirurgiasModule
      ),
      canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
