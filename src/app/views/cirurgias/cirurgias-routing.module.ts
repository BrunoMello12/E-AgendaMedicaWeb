import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { CirurgiasService } from './services/cirurgias.service';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { MedicosService } from '../medicos/services/medicos.service';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { FormsCirurgiaViewModel } from './models/FormsCirurgiaViewModel';
import { VisualizarCirurgiaViewModel } from './models/VisualizarCirurgiaViewModel';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';
import { ListarMedicoViewModel } from '../medicos/models/listarMedicoViewModel';
import { VisualizarMedicoCirurgiaComponent } from './visualizar-medico-cirurgia/visualizar-medico-cirurgia.component';

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
};

const listarCirurgiasResolver = () => {
  return inject(CirurgiasService).selecionarTodos();
};

const formsCirurgiaResolver: ResolveFn<FormsCirurgiaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarCirurgiaResolver = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiasService).selecionarPorIdCompleto(
    route.paramMap.get('id')!
  );
};

const visualizarMedicosCirurgiaResolver: ResolveFn<ListarMedicoViewModel[]> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiasService).selecionarTodosMedicosCirurgias(
    route.paramMap.get('id')!
  );
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
  {
    path: 'editar/:id',
    component: EditarCirurgiaComponent,
    resolve: { cirurgia: formsCirurgiaResolver, medicos: listarMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirCirurgiaComponent,
    resolve: { cirurgia: visualizarCirurgiaResolver },
  },
  {
    path: 'medicos/:id',
    component: VisualizarMedicoCirurgiaComponent,
    resolve: { medicosCirurgia: visualizarMedicosCirurgiaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiasRoutingModule { }
