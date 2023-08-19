import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';
import { InputFetchService } from '../input-fetch.service';
import { ProductVariableList } from '../inputGroup';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  // value = -2;
  productDataList: ProductVariableList[] = [];
  selectedProduct: ProductVariableList | undefined;
  combinedBoxMesh: ProductVariableList = {
  };
  boxMesh!: THREE.Mesh;

  constructor(
    private inputFetchService: InputFetchService,
    private boxmeshService: BoxMeshService,
    private combinedMeshService: CombinedMeshService,
  ) {
    this.inputFetchService.getInputDetails().then((productDataList: ProductVariableList[]) => {
      this.productDataList = productDataList;
      console.log(this.productDataList)
    });
  }

  ngOnInit(): void {
    this.combinedMeshService.incrementedProduct$.subscribe((value) => {
      this.incrementValue(value);
      console.log(value)
    });
  }

  incrementValue(value:number) {
    // Increment the value

    if (value < this.productDataList.length) {
      this.selectedProduct = this.productDataList[value];
      console.log(this.selectedProduct);
      this.boxMesh = this.boxmeshService.getBox();

      if (this.selectedProduct && this.boxMesh) {
        this.combinedMeshService.updateProperties(this.boxMesh, this.selectedProduct);
        this.combinedBoxMesh = this.combinedMeshService.getProperties() || {};
        console.log(this.combinedBoxMesh);
      }
     
    }
  }
}