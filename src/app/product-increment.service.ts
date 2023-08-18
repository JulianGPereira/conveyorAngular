import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductIncrementService {
  private functionCallSource = new Subject<void>();
  functionCall$ = this.functionCallSource.asObservable();

  addProductProperties() {
    this.functionCallSource.next();
  }

  findResultofStage()
  {
    this.functionCallSource.next();

  }

  constructor() { }
}
