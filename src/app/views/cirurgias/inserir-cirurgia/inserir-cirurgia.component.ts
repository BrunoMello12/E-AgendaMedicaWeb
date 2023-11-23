import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ListarMedicoViewModel } from '../../medicos/models/listarMedicoViewModel';
import { CirurgiasService } from '../services/cirurgias.service';
import { FormsCirurgiaViewModel } from '../models/FormsCirurgiaViewModel';

@Component({
  selector: 'app-inserir-cirurgia',
  templateUrl: './inserir-cirurgia.component.html',
  styleUrls: ['./inserir-cirurgia.component.scss']
})
export class InserirCirurgiaComponent {
  form!: FormGroup;
  cirurgiaVM!: FormsCirurgiaViewModel;
  ListaMedicos$?: Observable<ListarMedicoViewModel[]>;

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
      medicosSelecionados: [[]]
    })

    this.ListaMedicos$ = this.route.data.pipe(map(dados => dados['medicos']));
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

    this.cirurgiasService.criar(this.cirurgiaVM).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(){
    this.notification.sucesso(
      `A cirurgia ${this.cirurgiaVM.titulo} foi inserida com sucesso!`
    );
    this.router.navigate(['/cirurgias/listar'])
  }

  processarFalha(err: any) {
    this.notification.erro(err.mensagem);
  }
}
