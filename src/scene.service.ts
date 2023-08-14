import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class SceneService {
  createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    return renderer;
  }

  createCamera(canvas: HTMLCanvasElement): THREE.PerspectiveCamera {
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    return new THREE.PerspectiveCamera(75, aspectRatio, 1, 1000);
  }

  getCanvasWidth(canvas: HTMLCanvasElement): number {
    return canvas.clientWidth;
  }

  getCanvasHeight(canvas: HTMLCanvasElement): number {
    return canvas.clientHeight;
  }

  
    scene= new THREE.Scene();
  
}
