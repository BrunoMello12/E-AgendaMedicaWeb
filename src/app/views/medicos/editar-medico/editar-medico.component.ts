import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsMedicoViewModel } from '../models/formsMedicoViewModel';
import { MedicosService } from '../services/medicos.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss']
})
export class EditarMedicoComponent {
  form!: FormGroup;
  medicoVM!: FormsMedicoViewModel;

  constructor(private formBuilder: FormBuilder,
    private medicosService: MedicosService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]),
      crm: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-[A-Z]{2}$/)]),
    })

    const medico = this.route.snapshot.data['medico'];

    this.form.patchValue(medico);
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

    const id = this.route.snapshot.paramMap.get('id')!;

    this.medicosService.editar(id, this.form?.value).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(){
    this.notification.sucesso(
      `O médico ${this.medicoVM.nome} foi editado com sucesso!`
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
