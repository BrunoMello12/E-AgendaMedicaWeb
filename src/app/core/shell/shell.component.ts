import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '../notification/services/notification.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  estaCarregando$!: Observable<boolean>;
  usuarioEstaLogado$!: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
      );

  constructor(private authService: AuthService, private router: Router, private notification: NotificationService){}
  
  ngOnInit(): void {
    this.usuarioEstaLogado$ = this.authService.obterUsuarioAutenticado()
      .pipe(
        map((usuario) => {
          if(!usuario){
            return false;
          }

          return true;
        })
      )
  }

  logout(){
    this.authService.logout().subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  processarSucesso(){
    this.notification.sucesso(`Logout com sucesso!`);
    this.router.navigate(['/login']);
  }

  processarFalha(error: Error){
    this.notification.erro(error.message);
  }
}
    