import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { ConsultasService } from './services/consultas.service';
import { VisualizarConsultaViewModel } from './models/VisualizarConsultaViewModel';
import { MedicosService } from '../medicos/services/medicos.service';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { FormsConsultaViewModel } from './models/FormsConsultaViewModel';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';

const listarConsultasResolver = () => {
  return inject(ConsultasService).selecionarTodos();
};

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
};

const formsConsultaResolver: ResolveFn<FormsConsultaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarConsultaResolver: ResolveFn<VisualizarConsultaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorIdCompleto(
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
    component: ListarConsultasComponent,
    resolve: { consultas: listarConsultasResolver },
  },
  {
    path: 'inserir',
    component: InserirConsultaComponent,
    resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'editar/:id',
    component: EditarConsultaComponent,
    resolve: { consulta: formsConsultaResolver, medicos: listarMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirConsultaComponent,
    resolve: { consulta: visualizarConsultaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
