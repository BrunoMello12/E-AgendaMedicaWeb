import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListarConsultaViewModel } from '../models/ListarConsultaViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.scss']
})
export class ListarConsultasComponent {
  consultas$?: Observable<ListarConsultaViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.consultas$ = this.route.data.pipe(map(dados => dados['consultas']));
    console.log(this.consultas$);
  }
}
