import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { ConsultasService } from './services/consultas.service';
import { VisualizarConsultaViewModel } from './models/VisualizarConsultaViewModel';

const listarConsultasResolver = () => {
  return inject(ConsultasService).selecionarTodos();
};

const formsConsultaResolver: ResolveFn<VisualizarConsultaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarConsultaResolver: ResolveFn<VisualizarConsultaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorId(
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
