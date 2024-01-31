import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './core/loading/services/loading.service';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  estaCarregando$?: Observable<boolean>;

  constructor(private LoadingService: LoadingService, private router: Router){
    this.router.events.subscribe((event: Event) =>
      this.atualizarStatusCarregamento(event)
    );
  }

  ngOnInit(): void {
    this.estaCarregando$ = this.LoadingService.obterStatusCarregamento();
  }

  atualizarStatusCarregamento(event: Event): void {
    if (event instanceof NavigationStart) {
      this.LoadingService.carregar();
    } else if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.LoadingService.parar();
    }
  }
}
