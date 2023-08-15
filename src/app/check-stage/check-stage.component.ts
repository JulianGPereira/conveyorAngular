import { Component, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { MySceneComponent } from '../my-scene/my-scene.component';

@Component({
  selector: 'app-check-stage',
  templateUrl: './check-stage.component.html',
  styleUrls: ['./check-stage.component.css']
})
export class CheckStageComponent implements OnInit,AfterViewInit  {
 
  // @ViewChild('canvas')  canvasRef!: ElementRef;
  private canvas!: HTMLCanvasElement
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private boxMesh!: THREE.Mesh;

  constructor(private sceneService: SceneService, private boxmeshService: BoxMeshService) {
   }

  moveStraight() {
    const canvasRef: ElementRef | undefined = this.sceneService.getCanvasRef();
    if (canvasRef) {
      const canvas: HTMLCanvasElement = canvasRef.nativeElement;
    console.log(this.canvas)
    // Check if canvasRef is available
      this.boxMesh = this.boxmeshService.boxMesh;
      this.scene = this.sceneService.getScene();

      // Create renderer and camera
      this.renderer = this.sceneService.getRenderer()
      this.camera = this.sceneService.createCamera(canvas);

      this.animate();
   
  }
}

  private animate() {
    if (this.boxMesh.position.x < -5) {
      this.boxMesh.position.x += 0.03;
      this.renderer.render(this.scene, this.camera);
    }

    requestAnimationFrame(() => this.animate());
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.moveStraight();
  }

}
