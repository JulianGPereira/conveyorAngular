import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckStageComponent } from './check-stage.component';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { MySceneModule } from '../my-scene/my-scene.module';



@NgModule({
  declarations: [
    CheckStageComponent
  ],
  imports: [
    CommonModule,
    MySceneModule
  ],
  exports:[
    CheckStageComponent
  ],
  providers:[
    SceneService
  ,BoxMeshService
]
  
})
export class CheckStageModule { }
