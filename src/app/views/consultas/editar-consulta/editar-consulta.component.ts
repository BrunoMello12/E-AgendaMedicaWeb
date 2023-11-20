import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ListarMedicoViewModel } from '../../medicos/models/listarMedicoViewModel';
import { ConsultasService } from '../services/consultas.service';
import { FormsConsultaViewModel } from '../models/FormsConsultaViewModel';

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrls: ['./editar-consulta.component.scss']
})
export class EditarConsultaComponent {
  form!: FormGroup;
  consultaVM!: FormsConsultaViewModel;
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(private formBuilder: FormBuilder,
    private consultasService: ConsultasService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medicoId: new FormControl('', [Validators.required]),
    })

    this.form.patchValue(this.route.snapshot.data['consulta']);
    console.log(this.route.snapshot.data['consulta']);

    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));
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

    const id = this.route.snapshot.paramMap.get('id')!;

    this.consultasService.editar(id, this.consultaVM).subscribe({
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
