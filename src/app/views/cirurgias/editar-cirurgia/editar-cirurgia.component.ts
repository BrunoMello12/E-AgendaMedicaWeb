import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ListarMedicoViewModel } from '../../medicos/models/listarMedicoViewModel';
import { FormsCirurgiaViewModel } from '../models/FormsCirurgiaViewModel';
import { CirurgiasService } from '../services/cirurgias.service';

@Component({
  selector: 'app-editar-cirurgia',
  templateUrl: './editar-cirurgia.component.html',
  styleUrls: ['./editar-cirurgia.component.scss']
})
export class EditarCirurgiaComponent {
  form!: FormGroup;
  cirurgiaVM!: FormsCirurgiaViewModel;
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(private formBuilder: FormBuilder,
    private cirurgiasService: CirurgiasService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medicosSelecionados: [[]],
    })

    this.form.patchValue(this.route.snapshot.data['cirurgia']);
    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));
    console.log(this.route.snapshot.data['cirurgia']);
  }

  campoEstaInvalido(nome: string){
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar(){
    if(this.form?.invalid){
      for(let erro of this.form.validate()) {
        this.notification.erro(erro);
      }

      return;
    }

    this.cirurgiaVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id')!;

    this.cirurgiasService.editar(id, this.cirurgiaVM).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(){
    this.notification.sucesso(
      `A cirurgia ${this.cirurgiaVM.titulo} foi editada com sucesso!`
    );
    this.router.navigate(['/cirurgias/listar'])
  }

  processarFalha(err: any) {
    this.notification.erro(err.mensagem);
  }
}
