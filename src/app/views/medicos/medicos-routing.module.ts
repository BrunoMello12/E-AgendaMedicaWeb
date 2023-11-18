import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { MedicosService } from './services/medicos.service';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { FormsMedicoViewModel } from './models/formsMedicoViewModel';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { VisualizarMedicoViewModel } from './models/visualizarMedicoViewModel';

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
};

const formsMedicoResolver: ResolveFn<VisualizarMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarPorId(route.paramMap.get('id')!);
};

// const visualizarCategoriaResolver: ResolveFn<VisualizarMedicoViewModel> = (
//   route: ActivatedRouteSnapshot
// ) => {
//   return inject(MedicosService).selecionarPorId(
//     route.paramMap.get('id')!
//   );
// };

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
