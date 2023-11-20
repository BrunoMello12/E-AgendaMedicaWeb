import { Component } from '@angular/core';
import { ConsultasService } from '../services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { VisualizarConsultaViewModel } from '../models/VisualizarConsultaViewModel';

@Component({
  selector: 'app-excluir-consulta',
  templateUrl: './excluir-consulta.component.html',
  styleUrls: ['./excluir-consulta.component.scss']
})
export class ExcluirConsultaComponent {
  consulta$?: Observable<VisualizarConsultaViewModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultasService: ConsultasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.consulta$ = this.route.data.pipe(map((res) => res['consulta']));
  }

  confirmar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.consultasService.excluir(id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso(
      `A consulta foi excluída com sucesso!`
    );

    this.router.navigate(['/consultas/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.mensagem);
  }
}
