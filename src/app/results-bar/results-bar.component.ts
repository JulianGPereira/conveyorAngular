import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductVariableList, StageValue } from '../inputGroup';
import { CombinedMeshService } from '../combined-mesh-service';
import { InputFetchService } from '../input-fetch.service';

@Component({
  selector: 'app-results-bar',
  templateUrl: './results-bar.component.html',
  styleUrls: ['./results-bar.component.css']
})

export class ResultsBarComponent implements OnInit {
  boxMeshProperties: ProductVariableList = {};
  @ViewChild ('stage1Res') private stage1:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage2Res') private stage2:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage3Res') private stage3:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage4Res') private stage4:ElementRef<HTMLButtonElement> |undefined

  private stagevalue?:StageValue

  constructor(
    private combinedMeshService: CombinedMeshService,
    private inputFetshService: InputFetchService
  ) 
  {

    
   
  }

   findResultofStage()
   {  
    this.stagevalue=this.inputFetshService.getStageValue()
    console.log(this.stagevalue?.stage1Value)

    this.boxMeshProperties = this.combinedMeshService.getProperties() || {};
    console.log("log in results component")
    if(this.stage1)
    {
      if(Number(this.boxMeshProperties.temperature)<Number(this.stagevalue?.stage1Value))
      {
        this.stage1.nativeElement.value='Pass'
        
      }else{
        this.stage1.nativeElement.value='Fail'
      } 
    }
    if(this.stage2)
    {
     Number(this.boxMeshProperties.temperature)<Number(this.stagevalue?.stage2Value)?
     this.stage2.nativeElement.value='Pass':this.stage2.nativeElement.value='Fail'

    }
    if(this.stage3)
    {
      Number(this.boxMeshProperties.temperature)<Number(this.stagevalue?.stage3Value)?
      this.stage3.nativeElement.value='Pass':this.stage3.nativeElement.value='Fail'
     
    }
    if(this.stage4)
    {
      Number(this.boxMeshProperties.temperature)<Number(this.stagevalue?.stage4Value)?
      this.stage4.nativeElement.value='Pass':this.stage4.nativeElement.value='Fail'

    }
   }


  ngOnInit(): void 
  {
    this.combinedMeshService. getProductResult$.subscribe(()=>{
      this.findResultofStage()
    })

   
  }

}
