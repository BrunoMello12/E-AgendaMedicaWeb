import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './views/login/login.component';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';
import { httpTokenInterceptor } from './core/auth/services/http-token.interceptor';
import { LoadingService } from './core/loading/services/loading.service';
import { RegistrarComponent } from './views/registrar/registrar.component';
import { RegistrarModule } from './views/registrar/registrar.module';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';

function logarUsuarioSalvoFactory(authService: AuthService){
  return () => authService.logarUsuarioSalvo();
}

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    DashboardModule,
    NgbModule,
    LoginModule,
    RegistrarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    },

    provideHttpClient(withInterceptors([httpTokenInterceptor])),
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
