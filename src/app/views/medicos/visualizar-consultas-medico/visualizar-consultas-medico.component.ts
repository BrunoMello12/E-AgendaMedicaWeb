import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarConsultaViewModel } from '../../consultas/models/ListarConsultaViewModel';

@Component({
  selector: 'app-visualizar-consultas-medico',
  templateUrl: './visualizar-consultas-medico.component.html',
  styleUrls: ['./visualizar-consultas-medico.component.scss']
})
export class VisualizarConsultasMedicoComponent {
  consultas$?: Observable<ListarConsultaViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.consultas$ = this.route.data.pipe(map(dados => dados['consultas']));
    console.log(this.consultas$);
  }
}
