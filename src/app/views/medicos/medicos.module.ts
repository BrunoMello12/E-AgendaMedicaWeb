import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { MedicosService } from './services/medicos.service';
import { SharedModule } from 'src/app/shared/shared.module';
import 'src/app/extensions/form-group.extensions';


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
    SharedModule,
  ],
  providers: [MedicosService]
})
export class MedicosModule { }
