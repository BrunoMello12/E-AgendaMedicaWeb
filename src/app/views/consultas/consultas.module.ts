import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicosService } from '../medicos/services/medicos.service';
import { ConsultasService } from './services/consultas.service';
import 'src/app/extensions/form-group.extensions';


@NgModule({
  declarations: [
    InserirConsultaComponent,
    EditarConsultaComponent,
    ExcluirConsultaComponent,
    ListarConsultasComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    SharedModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [ConsultasService, MedicosService, DatePipe]
})
export class ConsultasModule { }
