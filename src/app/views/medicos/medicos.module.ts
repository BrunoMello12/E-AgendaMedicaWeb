import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';


@NgModule({
  declarations: [
    InserirMedicoComponent,
    EditarMedicoComponent,
    ExcluirMedicoComponent,
    ListarMedicosComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
  ]
})
export class MedicosModule { }
