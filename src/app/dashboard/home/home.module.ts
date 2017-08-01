import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
