import { Component } from '@angular/core';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';
import { InputFetchService } from '../input-fetch.service';
import { ProductVariableList } from '../inputGroup';
import { ProductIncrementService } from '../product-increment.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  value: number = -1;
  productDataList: ProductVariableList[] = [];
  selectedProduct: ProductVariableList | undefined;
  combinedBoxMesh: ProductVariableList = {
  };
  boxMesh!: THREE.Mesh;

  constructor(
    private inputFetchService: InputFetchService,
    private productIncrement: ProductIncrementService,
    private boxmeshService: BoxMeshService,
    private combinedMeshService: CombinedMeshService
  ) {
    this.inputFetchService.getInputDetails().then((productDataList: ProductVariableList[]) => {
      this.productDataList = productDataList;
    });

    this.productIncrement.functionCall$.subscribe(() => {
      this.incrementValue();
    });
  }

  incrementValue() {
    this.value++; // Increment the value

    if (this.value < this.productDataList.length) {
      this.selectedProduct = this.productDataList[this.value];
      this.boxMesh = this.boxmeshService.getBox();

      if (this.selectedProduct && this.boxMesh) {
        this.combinedMeshService.updateProperties(this.boxMesh, this.selectedProduct);
        this.combinedBoxMesh = this.combinedMeshService.getProperties() || {};
        console.log(this.combinedBoxMesh);
        console.log(this.combinedBoxMesh.dimensions);
      }
    }
  }
}
