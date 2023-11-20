import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VisualizarMedicoViewModel } from '../models/visualizarMedicoViewModel';
import { MedicosService } from '../services/medicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-excluir-medico',
  templateUrl: './excluir-medico.component.html',
  styleUrls: ['./excluir-medico.component.scss']
})
export class ExcluirMedicoComponent {
  medico$?: Observable<VisualizarMedicoViewModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicosService: MedicosService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.medico$ = this.route.data.pipe(map((res) => res['medico']));
  }

  confirmar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.medicosService.excluir(id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso(
      `O médico foi excluído com sucesso!`
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.mensagem);
  }
}
