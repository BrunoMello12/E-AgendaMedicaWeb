import { NgModule } from '@angular/core';
import { ShellModule } from './shell/shell.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [],
  exports: [ShellModule, NotificationModule],
})
export class CoreModule { }
