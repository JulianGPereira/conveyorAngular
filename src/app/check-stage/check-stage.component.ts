import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';

@Component({
  selector: 'app-check-stage',
  templateUrl: './check-stage.component.html',
  styleUrls: ['./check-stage.component.css']
})
export class CheckStageComponent implements OnInit {
  @ViewChild('canvas') public canvasRef!: ElementRef <HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private boxMesh!: THREE.Mesh;

  constructor(private sceneService: SceneService, private boxmeshService: BoxMeshService) { }

  moveStraight() {
    console.log(this.canvasRef)
    // Check if canvasRef is available
    if (this.canvasRef) {
      this.boxMesh = this.boxmeshService.boxMesh;
      this.scene = this.sceneService.scene;

      // Create renderer and camera
      this.renderer = this.sceneService.createRenderer(this.canvasRef.nativeElement);
      this.camera = this.sceneService.createCamera(this.canvasRef.nativeElement);

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
}
