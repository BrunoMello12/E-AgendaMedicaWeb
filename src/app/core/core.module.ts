import { NgModule } from '@angular/core';
import { ShellModule } from './shell/shell.module';
import { NotificationModule } from './notification/notification.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellModule,
    AppRoutingModule,
    NotificationModule,
    LoadingModule
  ],
  exports: [ShellModule, LoadingModule],
})
export class CoreModule { }
