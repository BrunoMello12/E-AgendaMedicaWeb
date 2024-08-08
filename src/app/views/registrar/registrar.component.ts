import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  form!: FormGroup;
  estaCarregando$!: Observable<boolean>;
  desabilitado: boolean = false;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private router: Router,private notification: NotificationService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  registrar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.notification.erro(item);
      }
      return;
    }

    this.desabilitado = true;

    this.authService.registrar(this.form.value).subscribe({
      next: (token) => this.processarSucesso(token),
      error: (err) => this.processarFalha(err)
    })
  }

  processarSucesso(registro: any){
    this.notification.sucesso(`${registro.usuarioToken.nome} foi registrado com sucesso!`);
    this.router.navigate(['/login']);
  }

  processarFalha(error: HttpErrorResponse){
    this.desabilitado = false;
    this.notification.erro(error.error.errors[0]);
  }
}
