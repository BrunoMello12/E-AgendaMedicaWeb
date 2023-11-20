import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListarCirurgiaViewModel } from '../models/ListarCirurgiaViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-cirurgia',
  templateUrl: './listar-cirurgia.component.html',
  styleUrls: ['./listar-cirurgia.component.scss']
})
export class ListarCirurgiaComponent {
  cirurgias$?: Observable<ListarCirurgiaViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cirurgias$ = this.route.data.pipe(map(dados => dados['cirurgias']));
    console.log(this.route.data.pipe(map(dados => dados['cirurgias'])))
  }
}
