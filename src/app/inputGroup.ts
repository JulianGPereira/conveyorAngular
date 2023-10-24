export interface ProductVariableList extends Record<string, any> {
  productid?: string;
  temperature?: number;
  weight?: number;
  quantity?: number;
  dimensions?: number;
}

export interface StageValue {
  stage1Value?: number;
  stage2Value?: number;
  stage3Value?: number;
  stage4Value?: number;
}

export interface StageResults {
  stage1Result?: any;
  stage2Result?: any;
  stage3Result?: any;
  stage4Result?: any;
}

export interface BoxMeshDetails {
  boxNum: number;
  position: any;
  name: string;
  castShadow: boolean;
  recieveShadow: boolean;
}

export interface MonotainerDetails extends Record<string, any> {
  id: string;
}
