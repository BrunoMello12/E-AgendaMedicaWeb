import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirurgiasRoutingModule } from './cirurgias-routing.module';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';


@NgModule({
  declarations: [
    InserirCirurgiaComponent
  ],
  imports: [
    CommonModule,
    CirurgiasRoutingModule
  ]
})
export class CirurgiasModule { }
