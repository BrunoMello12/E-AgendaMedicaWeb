import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CirurgiasRoutingModule } from './cirurgias-routing.module';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { CirurgiasService } from './services/cirurgias.service';
import { MedicosService } from '../medicos/services/medicos.service';
import { VisualizarMedicoCirurgiaComponent } from './visualizar-medico-cirurgia/visualizar-medico-cirurgia.component';
import 'src/app/extensions/form-group.extensions';


@NgModule({
  declarations: [
    InserirCirurgiaComponent,
    EditarCirurgiaComponent,
    ExcluirCirurgiaComponent,
    ListarCirurgiaComponent,
    VisualizarMedicoCirurgiaComponent
  ],
  imports: [
    CommonModule,
    CirurgiasRoutingModule,
    SharedModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [CirurgiasService, MedicosService, DatePipe]
})
export class CirurgiasModule { }
