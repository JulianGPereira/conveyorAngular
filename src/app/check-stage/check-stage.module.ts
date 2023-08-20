import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckStageComponent } from './check-stage.component';
import { SceneService } from 'src/app/my-scene/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { MySceneModule } from '../my-scene/my-scene.module';
import { ResultsBarComponent } from '../results-bar/results-bar.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CheckStageComponent
  ],
  imports: [
    CommonModule,
    MySceneModule,
    FormsModule
  ],
  exports:[
    CheckStageComponent
  ],
  providers:[
    SceneService
  ,BoxMeshService,
  ResultsBarComponent
]
  
})
export class CheckStageModule { }
