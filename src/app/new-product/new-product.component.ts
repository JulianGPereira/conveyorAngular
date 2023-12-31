import {  Component, OnInit } from '@angular/core';
import { SceneService } from 'src/app/my-scene/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';

@Component({
  selector: '[app-new-product]',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
 scene=this.sceneService.getScene()
 value:number=-1

  constructor(private sceneService: SceneService,
    private boxmeshService:BoxMeshService,
     private combinedMeshService: CombinedMeshService,
     ) { }

  boxMesh!:THREE.Mesh
  newProduct()
  {
    this. boxMesh=this.boxmeshService.createBox()
    this.boxMesh.position.set(-7.5,3.6,-1.45)
    this.scene.add(this.boxMesh)
    this.combinedMeshService.setProductIncrement(this.value+=1);
   
  }
  ngOnInit(): void {    
  }
}
