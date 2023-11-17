import { NgModule } from '@angular/core';
import { ShellModule } from './shell/shell.module';
import { NotificationModule } from './notification/notification.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellModule,
    AppRoutingModule,
    NotificationModule
  ],
  exports: [ShellModule],
})
export class CoreModule { }
