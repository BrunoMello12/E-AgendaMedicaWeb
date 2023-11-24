import { Component } from '@angular/core';
import { ListarCirurgiaViewModel } from '../../cirurgias/models/ListarCirurgiaViewModel';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-visualizar-cirurgias-medico',
  templateUrl: './visualizar-cirurgias-medico.component.html',
  styleUrls: ['./visualizar-cirurgias-medico.component.scss']
})
export class VisualizarCirurgiasMedicoComponent {
  cirurgias$?: Observable<ListarCirurgiaViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cirurgias$ = this.route.data.pipe(map(dados => dados['cirurgias']));
    console.log(this.cirurgias$);
  }
}
