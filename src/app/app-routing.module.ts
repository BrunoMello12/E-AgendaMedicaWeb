import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./views/medicos/medicos.module').then(
        (m) => m.MedicosModule
      ),
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./views/consultas/consultas.module').then(
        (m) => m.ConsultasModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
