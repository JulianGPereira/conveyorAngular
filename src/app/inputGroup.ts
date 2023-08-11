export interface productVariableList
{
    productId:string
    temperature:number
    weight:number
    quantity:number
    dimensions:number
}

export interface stageValue
{
    stage1Value:number
    stage2Value:number
    stage3Value:number
    stage4Value:number
}

export interface stageResults
{
    stage1Result:string
    stage2Result:string
    stage3Result:string
    stage4Result:string
}

export interface boxMeshDetails
{
        boxNum:number
        position:any
        name:string
        castShadow:boolean
        recieveShadow:boolean
}