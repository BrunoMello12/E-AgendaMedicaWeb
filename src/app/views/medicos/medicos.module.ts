import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';

@NgModule({
  declarations: [
    InserirMedicoComponent,
    EditarMedicoComponent,
    ExcluirMedicoComponent,
    ListarMedicosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MedicosModule { }
