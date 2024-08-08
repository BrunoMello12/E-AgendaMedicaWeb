import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { MedicosService } from '../services/medicos.service';
import { FormsMedicoViewModel } from '../models/formsMedicoViewModel';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss']
})
export class InserirMedicoComponent {
  form!: FormGroup;
  medicoVM!: FormsMedicoViewModel;
  userId: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private medicosService: MedicosService,
    private notification: NotificationService,
    private router: Router,
    private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]),
      crm: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-[A-Z]{2}$/)]),
    })

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

    this.medicoVM = this.form.value;

    // Verificar se o ID do usuário está disponível
  if (!this.userId) {
    this.notification.erro('ID do usuário não encontrado.');
    return;
  }

  this.medicoVM.usuarioId = this.userId;

    this.medicosService.criar(this.medicoVM).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(){
    this.notification.sucesso(
      `O médico ${this.medicoVM.nome} foi inserido com sucesso!`
    );
    this.router.navigate(['/medicos/listar'])
  }

  processarFalha(err: any) {
    if(err.error.erros == "'Telefone' is not in the correct format."){
      this.notification.erro('O campo telefone deve estar no formato correto!')
    }else{
      this.notification.erro(err.error.erros);
    }
  }
}

