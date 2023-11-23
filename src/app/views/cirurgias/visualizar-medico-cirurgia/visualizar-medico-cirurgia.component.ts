import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ListarMedicoViewModel } from '../../medicos/models/listarMedicoViewModel';

@Component({
  selector: 'app-visualizar-medico-cirurgia',
  templateUrl: './visualizar-medico-cirurgia.component.html',
  styleUrls: ['./visualizar-medico-cirurgia.component.scss']
})
export class VisualizarMedicoCirurgiaComponent {
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(map(dados => dados['medicosCirurgia']), tap(x => console.log(x)));
  }
}
