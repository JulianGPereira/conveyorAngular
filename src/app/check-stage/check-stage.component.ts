import { Component, OnInit, ElementRef,AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { StageValue } from '../inputGroup';
import { ResultsBarComponent } from '../results-bar/results-bar.component';
@Component({
  selector: 'app-check-stage',
  templateUrl: './check-stage.component.html',
  styleUrls: ['./check-stage.component.css']
})
export class CheckStageComponent implements OnInit,AfterViewInit  {
 
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private boxMesh!: THREE.Mesh;
  private stagevalue!:StageValue

  constructor(private sceneService: SceneService, 
    private boxmeshService: BoxMeshService,
    private resultsBarComponent: ResultsBarComponent,
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

      this.resultsBarComponent.findResultofStage()
    }
    }
  
  

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
  }

}
