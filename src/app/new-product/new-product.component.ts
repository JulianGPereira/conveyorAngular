import { Component, OnInit } from '@angular/core';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
@Component({
  selector: '[app-new-product]',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
 scene=this.sceneService.getScene()

  constructor(private sceneService: SceneService,
    private boxmeshService:BoxMeshService,
     private combinedMeshService: CombinedMeshService,
     private productdetailsComponent:ProductDetailsComponent
     ) { }

  boxMesh!:THREE.Mesh
  newProduct()
  {

    console.log(this.combinedMeshService.getProperties())
    this. boxMesh=this.boxmeshService.createBox()
    this.boxMesh.position.set(-7.5,3.6,-1.45)
    this.scene.add(this.boxMesh)
    console.log("new product box details "+this.boxMesh.id)
    this.productdetailsComponent.incrementValue()

  }

 

  ngOnInit(): void {
    
  }

}
