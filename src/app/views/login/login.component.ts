import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LoadingService } from 'src/app/core/loading/services/loading.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  estaCarregando$!: Observable<boolean>;
  desabilitado: boolean = false;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private notification: NotificationService,private loading: LoadingService, private router: Router, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  
  login(){
    
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.notification.erro(item.toString());
      }
      return;
    }
    
    this.desabilitado = true;
    
    this.authService.login(this.form.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err)
    })
  }

  processarSucesso(login: any){
    this.notification.sucesso(`Seja Bem Vindo, ${login.usuarioToken.nome}`);
    this.router.navigate(['/dashboard']);
  }

  processarFalha(error: HttpErrorResponse){
    this.desabilitado = false;
    this.notification.erro(error.error.errors[0]);
  }
}
