import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { MedicosService } from '../services/medicos.service';
import { FormsMedicoViewModel } from '../models/formsMedicoViewModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss']
})
export class InserirMedicoComponent {
  form!: FormGroup;
  medicoVM!: FormsMedicoViewModel;

  constructor(private formBuilder: FormBuilder,
    private medicosService: MedicosService,
    private toastrService: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    })
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

    this.medicosService.criar(this.medicoVM).subscribe({
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

