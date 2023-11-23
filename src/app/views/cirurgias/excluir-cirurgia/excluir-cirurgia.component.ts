import { Component } from '@angular/core';
import { VisualizarCirurgiaViewModel } from '../models/VisualizarCirurgiaViewModel';
import { CirurgiasService } from '../services/cirurgias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-excluir-cirurgia',
  templateUrl: './excluir-cirurgia.component.html',
  styleUrls: ['./excluir-cirurgia.component.scss']
})
export class ExcluirCirurgiaComponent {
  cirurgia$?: Observable<VisualizarCirurgiaViewModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cirurgiasService: CirurgiasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cirurgia$ = this.route.data.pipe(map((res) => res['cirurgia']));
  }

  confirmar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.cirurgiasService.excluir(id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso(
      `A cirurgia foi excluída com sucesso!`
    );

    this.router.navigate(['/cirurgias/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.mensagem);
  }
}
