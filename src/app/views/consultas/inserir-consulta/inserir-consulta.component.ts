import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FormsConsultaViewModel } from '../models/FormsConsultaViewModel';
import { ConsultasService } from '../services/consultas.service';

@Component({
  selector: 'app-inserir-consulta',
  templateUrl: './inserir-consulta.component.html',
  styleUrls: ['./inserir-consulta.component.scss']
})
export class InserirConsultaComponent {
  form!: FormGroup;
  consultaVM!: FormsConsultaViewModel;

  constructor(private formBuilder: FormBuilder,
    private consultasService: ConsultasService,
    private notification: NotificationService,
    private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medico: new FormControl('', [Validators.required]),
    })
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

    this.consultaVM = this.form.value;

    this.consultasService.criar(this.consultaVM).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(){
    this.notification.sucesso(
      `A consulta ${this.consultaVM.titulo} foi inserida com sucesso!`
    );
    this.router.navigate(['/consultas/listar'])
  }

  processarFalha(err: any) {
    this.notification.erro(err.mensagem);
  }
}
