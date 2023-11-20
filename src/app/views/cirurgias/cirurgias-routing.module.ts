import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { CirurgiasService } from './services/cirurgias.service';

const listarCirurgiasResolver = () => {
  return inject(CirurgiasService).selecionarTodos();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCirurgiaComponent,
    resolve: { consultas: listarCirurgiasResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiasRoutingModule { }
