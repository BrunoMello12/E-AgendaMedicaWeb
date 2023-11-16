import { NgModule } from '@angular/core';
import { ShellModule } from './shell/shell.module';
import { NotificationModule } from './notification/notification.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellModule,
    NotificationModule
  ],
  exports: [ShellModule],
})
export class CoreModule { }
