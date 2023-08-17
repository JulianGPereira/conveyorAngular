import { Injectable } from '@angular/core';
import { ProductVariableList } from './inputGroup'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class CombinedMeshService {
  private combinedMeshProperties: ProductVariableList | undefined;

  constructor() {}

  updateProperties(boxMesh: THREE.Mesh, selectedProduct: ProductVariableList) {
    this.combinedMeshProperties = {
      ...(boxMesh as object),
      ...selectedProduct
    };
  }
  getProperties(): ProductVariableList | undefined {
    return this.combinedMeshProperties;
  }
}
