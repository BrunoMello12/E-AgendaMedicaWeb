import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirurgiasRoutingModule } from './cirurgias-routing.module';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InserirCirurgiaComponent,
    EditarCirurgiaComponent,
    ExcluirCirurgiaComponent,
    ListarCirurgiaComponent
  ],
  imports: [
    CommonModule,
    CirurgiasRoutingModule,
    SharedModule,
    MatRadioModule,
    MatSelectModule,
  ]
})
export class CirurgiasModule { }
