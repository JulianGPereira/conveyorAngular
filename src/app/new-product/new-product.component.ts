import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { SceneService } from 'src/app/my-scene/scene.service';
import { BoxMeshService } from '../my-scene/boxMesh.service';
import { BoxBeltService } from '../my-scene/box-belt.service';
import { ModelLoaderService } from '../my-scene/model-loader.service';
import * as THREE from 'three';
import { ForkLiftService } from '../my-scene/fork-lift.service';
import { MonotainerService } from '../my-scene/monotainer.service';
import { InputFetchService } from '../my-scene/input-fetch.service';
import { MonotainerDetails } from '../inputGroup';
import { LaneService } from '../my-scene/lane.service';

@Component({
  selector: '[app-new-product]',
  templateUrl: './new-product.component.html',
  styles:[],
})
export class NewProductComponent implements OnInit,AfterViewInit {
 scene=this.sceneService.getScene()
 value:number=-1
 private productInterval!: NodeJS.Timeout;
  monotainerList:MonotainerDetails[]=[]
  displaylist:MonotainerDetails[]=[]
  monotainerListCopy:MonotainerDetails[]=[]
  monotainerInLane:MonotainerDetails[]=[]
  objectsToRemove!:THREE.Object3D<THREE.Event>[]
  filledForkliftExit!:THREE.Group

  constructor(private sceneService: SceneService,
    private boxmeshService:BoxMeshService,
     private boxBeltService:BoxBeltService,
     private modelLoaderService:ModelLoaderService,
     private forkLiftService:ForkLiftService,
     private monotainerService:MonotainerService,
     private inputFetchService:InputFetchService,
     public laneService:LaneService
     ) { 
      this.monotainerList = [];
      this.monotainerListCopy=[]
     }
  async ngAfterViewInit() {
     this.startProductGeneration()  
     this.boxMesh = await this.boxmeshService.createBox();

     this.createMonotainer()
  }

 private boxMesh!:THREE.Group
  async newProduct()
  { 
    // console.log(this.boxMesh)
    this.boxMesh.position.set(-5.3,2.9,5)
    this.boxMesh.scale.set(.015,.015,.015)
    this.scene.add(this.boxMesh)
    // this.boxBeltService.moveOnBelt()
    // console.log(this.displaylist)
  }

  i=0
  moveForkLift(id:string)
  { 
    const forkLiftModel=this.modelLoaderService.getFilledForkLiftModel()
    console.log("moveForkLift")
    this.scene.add(forkLiftModel)
    this.forkLiftService.animateForkLift()
    this.monotainerInLane.push(...this.monotainerList.filter(item => item.id === id));
    console.log("inLane"+this.monotainerInLane)
    this.monotainerList = this.monotainerList.filter(item => item.id !== id);
    this. objectsToRemove = this.scene.children.filter(object => object.name === id);

    // Remove each matching object from the scene
    this.objectsToRemove.forEach(object => {
     this. scene.remove(object);
    //  console.log(this.objectsToRemove)
    });
  }

  startProductGeneration() {
    this.productInterval = setInterval(() => {
      this.newProduct();
    }, 4000);
  }

  stopProductGeneration() {
    if (this.productInterval) {
      clearInterval(this.productInterval);
    }
  }


  createMonotainer() {
    
    console.log('Creating monotainers');
    this.monotainerList.forEach ((monotainerDetails) => {
      this.monotainerService.stackMonotainer(monotainerDetails);
    });
  }
  
  ngOnInit(): void {  
    this.inputFetchService.getInputDetailsMonotainer().then((MonotainerList: MonotainerDetails[]) => {
      this.monotainerList = MonotainerList;
      this.monotainerListCopy=MonotainerList;
    });
  }

  zPos1:number=-4
  zPos2:number=-4
  zPos3:number=-4
  goToLane1()
  {
    const forkLiftposition=new THREE.Vector3(-.2,2.6,7)
    const monotainerPosition=new THREE.Vector3(-.4,3.2,this.zPos1+=1)
    this.laneService.setInLane(this.objectsToRemove,forkLiftposition,monotainerPosition)
  }

  goToLane2()
  {
    const forkLiftposition=new THREE.Vector3(1.3,2.6,7)
    const monotainerPosition=new THREE.Vector3(1.2,3.2,this.zPos2+=1)
    this.laneService.setInLane(this.objectsToRemove,forkLiftposition,monotainerPosition)
  }

  goToLane3()
  {
    const forkLiftposition=new THREE.Vector3(2.9,2.6,7)
    const monotainerPosition=new THREE.Vector3(2.8,3.2,this.zPos3+=1)
    this.laneService.setInLane(this.objectsToRemove,forkLiftposition,monotainerPosition)
  }


  async forkLiftExit(id:string)
  {
    this.monotainerInLane = this.monotainerInLane.filter(item => item.id !== id);
    this. objectsToRemove = this.scene.children.filter(object => object.name === id);
    this.objectsToRemove.forEach(object => {
      this. scene.remove(object);
     });

     this.filledForkliftExit=this.modelLoaderService.getFilledForkLiftModelExit()
     const forkLiftposition=new THREE.Vector3(4,2.6,5)
     this.filledForkliftExit.position.copy(forkLiftposition)
     this.filledForkliftExit.rotateY(Math.PI/2)
     this.scene.add(this.filledForkliftExit)
     await this.forkLiftService.animateToPositionExit(new THREE.Vector3(8, this.filledForkliftExit.position.y, this.filledForkliftExit.position.z))
     console.log("Exit")
    
     this.filledForkliftExit.rotateY(Math.PI/2)
     setTimeout(() => {
      this.scene.remove(this.filledForkliftExit);
      this.filledForkliftExit.rotateY(Math.PI)
    
    }, 1000);
  }
  }
