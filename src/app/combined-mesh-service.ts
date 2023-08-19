import { Injectable } from '@angular/core';
import { ProductVariableList } from './inputGroup'; // Adjust the import path as needed
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombinedMeshService {
  private combinedMeshProperties: ProductVariableList | undefined;
  private product$ = new BehaviorSubject<any>({});
  private results$=new BehaviorSubject<any>({});
  private move$=new BehaviorSubject<any>({});
  incrementedProduct$ = this.product$.asObservable();
  getProductResult$=this.results$.asObservable()
  setBoxMoveStraight$=this.move$.asObservable()

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

  setProductIncrement(value:number) {
    
    this.product$.next(value);
  }

  getProductResults(status: boolean)
  {
    this.results$.next(status)
  }

  setBoxMoveStraight(xPos:number)
  {
    this.move$.next(xPos)
  }
}
