import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySceneComponent } from './my-scene.component';
import { SceneService } from 'src/scene.service';



@NgModule({
  declarations: [
    MySceneComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MySceneComponent
  ],
  providers:[SceneService]
})
export class MySceneModule { }
