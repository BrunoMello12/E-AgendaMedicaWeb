import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { MedicosService } from './services/medicos.service';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { VisualizarMedicoViewModel } from './models/visualizarMedicoViewModel';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { ListarConsultaViewModel } from '../consultas/models/ListarConsultaViewModel';
import { VisualizarConsultasMedicoComponent } from './visualizar-consultas-medico/visualizar-consultas-medico.component';
import { VisualizarCirurgiasMedicoComponent } from './visualizar-cirurgias-medico/visualizar-cirurgias-medico.component';
import { ListarCirurgiaViewModel } from '../cirurgias/models/ListarCirurgiaViewModel';

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
};

const visualizarConsultasMedicoResolver: ResolveFn<ListarConsultaViewModel[]> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarConsultasMedico(
    route.paramMap.get('id')!
  );
};

const visualizarCirurgiasMedicoResolver: ResolveFn<ListarCirurgiaViewModel[]> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarCirurgiasMedico(
    route.paramMap.get('id')!
  );
};

const formsMedicoResolver: ResolveFn<VisualizarMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarMedicoResolver: ResolveFn<VisualizarMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarPorId(
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
    component: ListarMedicosComponent,
    resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'inserir',
    component: InserirMedicoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarMedicoComponent,
    resolve: { medico: formsMedicoResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirMedicoComponent,
    resolve: { medico: visualizarMedicoResolver },
  },
  {
    path: 'visualizar-medico-consultas/:id',
    component: VisualizarConsultasMedicoComponent,
    resolve: { consultas: visualizarConsultasMedicoResolver },
  },
  {
    path: 'visualizar-medico-cirurgias/:id',
    component: VisualizarCirurgiasMedicoComponent,
    resolve: { cirurgias: visualizarCirurgiasMedicoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
