import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { CirurgiasService } from './services/cirurgias.service';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { MedicosService } from '../medicos/services/medicos.service';

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
};

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
    resolve: { cirurgias: listarCirurgiasResolver },
  },
  {
    path: 'inserir',
    component: InserirCirurgiaComponent,
    resolve: { medicos: listarMedicosResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiasRoutingModule { }
