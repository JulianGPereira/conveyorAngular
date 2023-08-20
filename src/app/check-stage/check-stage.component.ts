import { Component, OnInit, ElementRef,AfterViewInit, OnDestroy  } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from 'src/app/my-scene/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { StageValue } from '../inputGroup';
import { CombinedMeshService } from '../combined-mesh-service';
import { InputFetchService } from '../input-fetch.service';
import {  Subscription } from 'rxjs';
@Component({
  selector: 'app-check-stage',
  templateUrl: './check-stage.component.html',
  styleUrls: ['./check-stage.component.css']
})
export class CheckStageComponent implements OnInit,AfterViewInit   {
 
  private subscription!: Subscription;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private boxMesh!: THREE.Mesh;
  private stagevalue?:StageValue

  stage1Ref?:number=23
  stage2Ref?:number=30
    stage3Ref?:number=24
    stage4Ref?:number=45
  constructor(
    private sceneService: SceneService, 
    private boxmeshService: BoxMeshService,
    private combinedMeshService:CombinedMeshService,
    private inputFetchService:InputFetchService
    ) {}

   moveStraight(xPos: number) {
   
    const canvasRef: ElementRef | undefined = this.sceneService.getCanvasRef();
    if (canvasRef) {
      this.boxMesh = this.boxmeshService.boxMesh;
      this.scene = this.sceneService.getScene();
  
      // get Created renderer and camera
      this.renderer = this.sceneService.getRenderer();
      this.camera = this.sceneService.getCamera();
      this.animateStraight(xPos);
    }
  }
  
  private animateStraight(xPos: number) {
    if (this.boxMesh.position.x < xPos) {
      this.boxMesh.position.x += 0.03;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(() => this.animateStraight(xPos));
    }
    else
    {

      this.boxMesh.position.set(xPos,this.boxMesh.position.y,this.boxMesh.position.z)
      this.combinedMeshService.getProductResults(true)
    }
    }
  
  
    ngOnInit(): void {
      this.updateStageValue();
     
    }



  ngAfterViewInit() {
    
  }

   updateStageValue(): void {
    
    this.stagevalue = {
      stage1Value: this.stage1Ref,
      stage2Value: this.stage2Ref,
      stage3Value: this.stage3Ref,
      stage4Value: this.stage4Ref
    };
    
    // Update the service with the new stagevalue
    this.inputFetchService.setStageValue(this.stagevalue);
  }

 


}
