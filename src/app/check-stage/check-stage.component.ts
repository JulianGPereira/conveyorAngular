import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from 'src/app/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { StageValue } from '../inputGroup';
import { CombinedMeshService } from '../combined-mesh-service';
import { InputFetchService } from '../input-fetch.service';
@Component({
  selector: 'app-check-stage',
  templateUrl: './check-stage.component.html',
  styleUrls: ['./check-stage.component.css']
})
export class CheckStageComponent implements OnInit,AfterViewInit  {
 @ViewChild('stage1value') private stage1Ref :ElementRef<HTMLInputElement>| undefined
 @ViewChild('stage2value') private stage2Ref :ElementRef<HTMLInputElement>| undefined
 @ViewChild('stage3value') private stage3Ref :ElementRef<HTMLInputElement>| undefined
 @ViewChild('stage4value') private stage4Ref :ElementRef<HTMLInputElement>| undefined
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private boxMesh!: THREE.Mesh;
  private stagevalue?:StageValue|undefined

  constructor(private sceneService: SceneService, 
    private boxmeshService: BoxMeshService,
    private combinedMeshService:CombinedMeshService,
    private inputFetchService:InputFetchService
    ) {
   }

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

      this.combinedMeshService.getProductResults(true)
    }
    }
  
  
  ngOnInit(): void {
    this.stagevalue.stage1Value=Number(this.stage1Ref?.nativeElement.value)
    this.stagevalue.stage2Value=Number(this.stage2Ref?.nativeElement.value)
    this.stagevalue.stage3Value=Number(this.stage3Ref?.nativeElement.value)
    this.stagevalue.stage4Value=Number(this.stage4Ref?.nativeElement.value)
    console.log(this.stagevalue)

    }
    
  

  ngAfterViewInit() {
    
  }

}
