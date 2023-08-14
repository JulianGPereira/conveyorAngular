import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,Input } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { SceneService } from 'src/scene.service';
@Component({
  selector: 'app-my-scene',
  templateUrl: './my-scene.component.html',
  styleUrls: ['./my-scene.component.css'],
  
})
export class MySceneComponent implements OnInit,AfterViewInit {
 

  constructor(private sceneService: SceneService) { }
  @ViewChild('canvas') private canvasRef!: ElementRef;

  //* Stage Properties

  @Input() public fieldOfView: number = 1;

  //? Scene properties
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private hemisphereLight!: THREE.HemisphereLight;
  private ambientLight!: THREE.AmbientLight;
  private model: any;
  private loader!:THREE.TextureLoader;
  private directionalLight!: THREE.DirectionalLight;
  private renderer!: THREE.WebGLRenderer;

  
  //? Helper Properties (Private Properties);

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();
  /**
   *Animate the model
   *
   * @private
   * @memberof MySceneComponent
   */
  private animateModel() {
    if (this.model) {
    }
  }

  /**
   *create controls
   *
   * @private
   * @memberof MySceneComponent
   */
   private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);

    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.minDistance = 9;
    this.controls.maxDistance = 15;
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI/2.6 ;
    this.controls.update();
  };


  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */


  private createScene() {
    //* Scene
 const scene=this.sceneService.scene;
    scene.background = new THREE.Color(0xB1E1FF)
    this.loaderGLTF.load('assets/projectNEW.glb', (glb: GLTF) => {
      this.model = glb.scene
      this.model.position.set(-6,3,-2)
      this.model.scale.set(.285,.285,.285)
      console.log(this.model);
      glb.scene.traverse(function(child){
        if((<THREE.Mesh> child).isMesh)
        {
          child.castShadow=true
          child.receiveShadow=true
        }
      })
      scene.add(this.model);
    });

    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio,1,1000)
    this.camera.position.set(-9,4,-3)

    // Lighting

    this. hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 2);
      scene.add(this.hemisphereLight);

    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    this.directionalLight.position.set(-11, 6, 5);
    this.directionalLight.target.position.set(-5, 0, -1);
    this.directionalLight.shadow.mapSize.width = 1024
    this.directionalLight.shadow.mapSize.height = 1024
    this.directionalLight.castShadow = true;
    scene.add(this.directionalLight);
    scene.add(this.directionalLight.target)

    this.ambientLight=new THREE.AmbientLight(0xffffff,2)
    scene.add(this.ambientLight)
    this.loader=new THREE.TextureLoader()
    const texture=this.loader.load('assets/ground.jpg')
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.set(40,40);
    const planeGeo = new THREE.PlaneGeometry(40, 40);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.receiveShadow = true;
  mesh.rotation.x = Math.PI * -.5;
  mesh.position.set(-7,2.5,-2)
  scene.add(mesh);

  }

  private getAspectRatio() {
    return this.canvas.width / this.canvas.height;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    this.renderer.shadowMap.enabled=true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    let component: MySceneComponent = this;

    (function render() {
      component.renderer.render(component.sceneService.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    }());
  }

  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();

  }

}
