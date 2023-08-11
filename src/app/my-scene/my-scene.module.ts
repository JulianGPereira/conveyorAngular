import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySceneComponent } from './my-scene.component';



@NgModule({
  declarations: [
    MySceneComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MySceneComponent
  ]
})
export class MySceneModule { }
