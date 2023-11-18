import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, map } from 'rxjs';
import { FormsMedicoViewModel } from '../models/formsMedicoViewModel';
import { MedicosService } from '../services/medicos.service';

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
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    })

    const medico = this.route.snapshot.data['medico'];
    console.log(medico);

    this.form.patchValue(medico);
  }

  campoEstaInvalido(nome: string){
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar(){
    if(this.form?.invalid){
      for(let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.medicoVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id')!;

    this.medicosService.editar(id, this.form?.value).subscribe({
      next: (medico: FormsMedicoViewModel) => this.processarSucesso(medico),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(medico: FormsMedicoViewModel){
    this.toastrService.success(`O medico ${medico.nome} foi cadastrado com sucesso!`, 'Sucesso')
    this.router.navigate(['/medicos/listar'])
  }

  processarFalha(erro: Error){
    this.toastrService.error(`${erro.message}`,'Error')
  }
}
