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
      telefone: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
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
    this.notification.erro(err.mensagem);
  }
}
