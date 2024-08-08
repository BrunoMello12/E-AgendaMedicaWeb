import { NgModule } from '@angular/core';
import { ShellModule } from './shell/shell.module';
import { NotificationModule } from './notification/notification.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { LoadingModule } from './loading/loading.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellModule,
    AppRoutingModule,
    NotificationModule,
    LoadingModule
  ],
  exports: [ShellModule, LoadingModule, AuthModule],
})
export class CoreModule { }
