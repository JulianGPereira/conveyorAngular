import { AfterViewInit, Component, ElementRef, ViewChild,Input, OnDestroy, OnInit } from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { SceneService } from './scene.service'; 
import { ModelLoaderService } from './model-loader.service'; 
import { DetailsPopupService } from './details-popup.service'; 
import { InputFetchService } from './input-fetch.service'; 
import { MonotainerDetails } from '../inputGroup'; 
import { MonotainerService } from './monotainer.service'; 
import { Object3D } from 'three';
import { LoaderService } from './loader.service';
@Component({
  selector: 'app-my-scene',
  templateUrl: './my-scene.component.html',
  styleUrls: ['./my-scene.component.css'],
})
export class MySceneComponent implements AfterViewInit,OnDestroy,OnInit{
  loading$ = this.spinnerService.loading$;
  @ViewChild('canvas') private canvasRef!: ElementRef <HTMLCanvasElement>;
  loaderSubscription: any;
  loaderHandler: any;
  loadStatus: any;
  selected :Object3D[]=[]
  constructor(
    private sceneService: SceneService,
    private modelLoaderService:ModelLoaderService,
    private detailsPopupService:DetailsPopupService,
    private inputFetchService:InputFetchService,
    private monotainerService:MonotainerService,
    private spinnerService :LoaderService
    ) {
      
     
     }


   //? Scene properties
   private camera!: THREE.PerspectiveCamera;
   private controls!: OrbitControls;
   private loader!:THREE.TextureLoader;
   private renderer!: THREE.WebGLRenderer;
   private mouse! :THREE.Vector2
   private raycaster!:THREE.Raycaster
   private labelRenderer!:CSS2DRenderer
   private hemiSphereLight!:THREE.HemisphereLight
     private directionalLight!:THREE.DirectionalLight
     private ambientLight!:THREE.AmbientLight
     private scene!: THREE.Scene;
     private models: THREE.Object3D[] = [];
     private lights: THREE.Light[] = [];
     monotainerList:MonotainerDetails[]=[]

     private id!: number;
  ngOnInit(): void {
    this.scene=this.sceneService.getScene();
  }

 
 
   /**
    * Create controls to view model in 3d plane
    */
   private createControls = () => {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.spinnerService.setRenderer(this.labelRenderer)
    // document.body.append(this.labelRenderer.domElement);
    this.controls = new OrbitControls(this.camera,  this.labelRenderer.domElement);
    this.controls.minDistance = 9;
    this.controls.maxDistance = 20;
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI/2.5 ;
    this.controls.maxAzimuthAngle = Math.PI/1.8 ;  
    this.controls.minAzimuthAngle = -Math.PI/1.8 ;
    this.controls.update();
  };
   
  /**
   * Creates renderer
   * @param canvas 
   * @returns renderer 
   */
  createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    this.renderer = new THREE.WebGLRenderer({  canvas,antialias: false });
  
    this.renderer.setPixelRatio(Math.max(window.devicePixelRatio, 5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
   
    // document.body.append(this.renderer.domElement);
    this.sceneService.setRenderer(this.renderer)
    return this.renderer;
  }


  /**
   * Creates scene where models are loaded 
   * here the lighting needed and the camera along with the models are rendered
   */
  async  createScene() {
  
    //* Scene
    this.scene.background = new THREE.Color(0x000000)
    const factoryModel_position = new THREE.Vector3(-4, 2.6, -1.5);
    const factoryModel_scale = new THREE.Vector3(0.06, 0.06, 0.06);
    const factoryMOdel_rotation=0
     await this.modelLoaderService.setFactoryModel(factoryModel_position,factoryModel_scale,factoryMOdel_rotation)

    const forkLift1_position=new THREE.Vector3(-8,2.6,-3)
    const forkLift1_scale=new THREE.Vector3(.05,.05,.05)
    const forkLift1_rotation=2*Math.PI
    await this.modelLoaderService.setModelForkLift(forkLift1_position,forkLift1_scale,forkLift1_rotation)

    //*Camera

    this.camera = this.sceneService.createCamera(this.canvasRef.nativeElement);
    this.camera.position.set(7,9,5)

    // Lighting

    this. hemiSphereLight = new THREE.HemisphereLight(0x20acb9, 0xacb920, 2);
     this. scene.add(this.hemiSphereLight);
this.lights.push(this.hemiSphereLight)

    this. directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    this.directionalLight.position.set(-11, 6, 5);
    this.directionalLight.target.position.set(-5, 0, -1);
    this.directionalLight.castShadow = false;
    this.scene.add(this.directionalLight);
    this.lights.push(this.directionalLight)

   this. ambientLight=new THREE.AmbientLight(0xffffff,2.5)
    this.scene.add(this.ambientLight)
    this.lights.push(this.ambientLight)

    this.loader=new THREE.TextureLoader()
    const texture=this.loader.load('assets//ground.jpg')
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
  mesh.name='ground'
  mesh.position.set(-2,2.5,-2)

this.modelLoaderService.setLanes()
this.renderer=this.createRenderer(this.canvasRef.nativeElement); 

  }


  /**
   * Starts rendering the scene every frame 
   */
  private startRenderingLoop() {
    const clock = new THREE.Clock();
    let component: MySceneComponent = this;
  
    const animate = () => {
      var delta = clock.getDelta();
      component.renderer.render(component.scene, component.camera);
      component.labelRenderer.render(component.scene, component.camera);
      // Use 'component.id' instead of 'this.id'
      component.id = requestAnimationFrame(animate);
    };
  
    animate(); // Start the animation loop
  }

  

  async ngAfterViewInit() {
   
this.spinnerService.show()
    await this.createScene();
    this.createControls();


    this.startRenderingLoop();
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.spinnerService.hide()
    })();    
    this.models=this.modelLoaderService.getModels()
    this.sceneService.setCanvasRef(this.canvasRef)

    this.labelRenderer.domElement.addEventListener('mousedown', (event: { clientX: number; clientY: number; }) => {
   
 getMeshIntersection(event.clientX, event.clientY);
  });

  this.labelRenderer.domElement.addEventListener('mousemove', (event: { clientX: number; clientY: number; }) => {
    mouseChange(event.clientX, event.clientY);
     });

this.labelRenderer.domElement.addEventListener('mouseup', (event: any) => {
  
  this.detailsPopupService.removeAlert()

});


//gets the mouse pointer location

const getMeshIntersection = (clientX: number, clientY: number) => {
  this. mouse = new THREE.Vector2();
    this. raycaster = new THREE.Raycaster(this.camera.position);
  
  // Convert mouse coordinates to normalized device coordinates
  
  const rect = this.renderer.domElement.getBoundingClientRect();
this.mouse.x = ( ( clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1;
this.mouse.y = - ( ( clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

  // Set the ray's origin and direction based on mouse coordinates
  this.raycaster.setFromCamera(this.mouse, this.camera);

  // Perform the intersection check
  const intersections = this.raycaster.intersectObjects(this.scene.children, true);
  if (intersections.length > 0 && 
    intersections[0].object.parent?.name!=='factoryGround'
     &&intersections[0].object.parent!.type=='Group'&&
     !intersections[0].object.parent!.name.startsWith("Lane")) {
    this.detailsPopupService.appendAlert(intersections[0].object.parent!.parent!)
  }

  return null;
};
const mouseChange = (clientX: number, clientY: number) => {
  this. mouse = new THREE.Vector2();
    this. raycaster = new THREE.Raycaster(this.camera.position);
  
  // Convert mouse coordinates to normalized device coordinates
  
  const rect = this.renderer.domElement.getBoundingClientRect();
this.mouse.x = ( ( clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1;
this.mouse.y = - ( ( clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

  // Set the ray's origin and direction based on mouse coordinates
  this.raycaster.setFromCamera(this.mouse, this.camera);

  // Perform the intersection check
  const intersections = this.raycaster.intersectObjects(this.scene.children, true);
    if(intersections[0]!==undefined)
    {
      if (intersections[0].object.parent!.name.startsWith("Lane")
      ||intersections[0].object.parent!.name.startsWith("Cube")
  && intersections[0].object.parent?.type=='Group'
  && intersections[0].object.parent?.name!=='factoryGround' ) {

    document.documentElement.style.cursor = 'pointer'
    
    if(intersections[0].object.parent!.name.startsWith("Cube")
    && intersections[0].object.parent?.type=='Group'
    && intersections[0].object.parent?.name!=='factoryGround' )
    {
      intersections[0].object.parent.parent!.scale.set(.1,.1,.1)
      this.selected.push(intersections[0].object.parent!.parent!)
    }
  }else{

    this.selected.forEach(element => {
      element.scale.set(.09,.09,.09)
    });
    this.selected=[]
    document.documentElement.style.cursor = 'default'
  }
    } 
  return null;
};

  }


  ngOnDestroy() {
    // Dispose of the renderer
    this.renderer.dispose();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        obj.material.dispose();
      }
    });
    this.models.forEach((model) => {
      this.scene.remove(model);
    });
    this.lights.forEach((light) => {
      this.scene.remove(light);
      light.dispose(); // Dispose of the light's resources
    });
   
    this.renderer.domElement.remove();
    this.labelRenderer.domElement.remove();
    // Cancel the animation loop
    cancelAnimationFrame(this.id);
    // Reset scene properties
    this.models = [];
    this.lights = []; 
  }
  
}
