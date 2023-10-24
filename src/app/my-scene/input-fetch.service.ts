import { Injectable } from '@angular/core';
import { MonotainerDetails, ProductVariableList } from '../inputGroup';
import { StageValue } from '../inputGroup';
@Injectable({
  providedIn: 'root',
})
export class InputFetchService {
  private stageValueRef?: StageValue;
  constructor() {}
  urlMonotainer = 'http://localhost:3000/monotainer';
  async getInputDetailsMonotainer(): Promise<MonotainerDetails[]> {
    const data = await fetch(this.urlMonotainer);
    return (await data.json()) ?? [];
  }

  setStageValue(stageValues: StageValue) {
    this.stageValueRef = stageValues;
  }

  getStageValue() {
    return this.stageValueRef;
  }
}
