import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySceneComponent } from './my-scene.component';
import { SceneService } from 'src/app/my-scene/scene.service';
import { BoxMeshService } from '../boxMesh.service';


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
  providers:[
    SceneService,
    BoxMeshService
  ]
})
export class MySceneModule { }
