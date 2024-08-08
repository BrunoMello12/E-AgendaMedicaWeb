import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ListarMedicoViewModel } from '../../medicos/models/listarMedicoViewModel';
import { CirurgiasService } from '../services/cirurgias.service';
import { FormsCirurgiaViewModel } from '../models/FormsCirurgiaViewModel';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Component({
  selector: 'app-inserir-cirurgia',
  templateUrl: './inserir-cirurgia.component.html',
  styleUrls: ['./inserir-cirurgia.component.scss']
})
export class InserirCirurgiaComponent {
  form!: FormGroup;
  cirurgiaVM!: FormsCirurgiaViewModel;
  ListaMedicos$?: Observable<ListarMedicoViewModel[]>;
  userId: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private cirurgiasService: CirurgiasService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medicosSelecionados: [[]]
    })

    this.ListaMedicos$ = this.route.data.pipe(map(dados => dados['medicos']));

    this.userId = this.localStorage.obterIdUsuario();
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

    if(this.cirurgiaVM.medicosSelecionados.length == 0){
      this.notification.erro("É necessário ter pelo menos um médico!");
      return;
    }

    if (!this.userId) {
      this.notification.erro('ID do usuário não encontrado.');
      return;
    }
  
    this.cirurgiaVM.usuarioId = this.userId;

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
    this.notification.erro(err.error.erros);
  }
}
