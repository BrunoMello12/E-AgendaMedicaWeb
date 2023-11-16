import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverDirective } from './directives/card-hover.directive';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CardHoverDirective],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CardHoverDirective,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
  ],
})
export class SharedModule { }
