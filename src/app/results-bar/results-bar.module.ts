import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsBarComponent } from './results-bar.component';



@NgModule({
  declarations: [
    ResultsBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ResultsBarComponent
  ]
})
export class ResultsBarModule { }
