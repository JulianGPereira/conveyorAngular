import { ElementRef, Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class SceneService {
  private canvasRef: ElementRef | undefined;
  private scene: THREE.Scene = new THREE.Scene(); // Initialize the scene
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;

  setCanvasRef(canvasRef: ElementRef) {
    this.canvasRef = canvasRef;
  }

  getCanvasRef(): ElementRef | undefined {
    return this.canvasRef;
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    this. renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    return this.renderer;
  }

  createCamera(canvas: HTMLCanvasElement): THREE.PerspectiveCamera {
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    this.camera= new THREE.PerspectiveCamera(75, aspectRatio, 1, 1000);
    return this.camera
  }

  getCamera():THREE.PerspectiveCamera{
    return this.camera
  }

  getCanvasWidth(canvas: HTMLCanvasElement): number {
    return canvas.clientWidth;
  }

  getCanvasHeight(canvas: HTMLCanvasElement): number {
    return canvas.clientHeight;
  }

  constructor()
  {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
  }
  getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }
}
