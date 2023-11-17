import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarMedicoViewModel } from '../models/listarMedicoViewModel';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.scss']
})
export class ListarMedicosComponent {
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));
  }
}
