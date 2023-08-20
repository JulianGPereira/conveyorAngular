import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductVariableList, StageValue } from '../inputGroup';
import { CombinedMeshService } from '../combined-mesh-service';
import { InputFetchService } from '../input-fetch.service';
import { StackBoxService } from './stack-box.service';

@Component({
  selector: 'app-results-bar',
  templateUrl: './results-bar.component.html',
  styleUrls: ['./results-bar.component.css']
})

export class ResultsBarComponent implements OnInit {
  boxMeshProperties: ProductVariableList = {};
  failCount:number=0

  @ViewChild ('stage1Res') private stage1:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage2Res') private stage2:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage3Res') private stage3:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage4Res') private stage4:ElementRef<HTMLButtonElement> |undefined

  private stagevalue?:StageValue

  constructor(
    private combinedMeshService: CombinedMeshService,
    private inputFetshService: InputFetchService,
    private stackboxService:StackBoxService
  ) 
  {

    
   
  }

   findResultofStage()
   {  
    this.stagevalue=this.inputFetshService.getStageValue()

    this.boxMeshProperties = this.combinedMeshService.getProperties() || {};
    if(this.stage1)
    {
      if(Number(this.boxMeshProperties.temperature)<Number(this.stagevalue?.stage1Value))
      {
        this.stage1.nativeElement.value='Pass'
       

        
      }else{
        this.stage1.nativeElement.value='Fail'
        this.failCount+=1
      } 
    }
    if(this.stage2)
    {
      

      if(Number(this.boxMeshProperties.weight)<Number(this.stagevalue?.stage2Value))
      {
        this.stage2.nativeElement.value='Pass'

        
      }else{
        this.stage2.nativeElement.value='Fail'
        this.failCount+=1
      } 

    }
    
    if(this.stage3)
    {
      if(Number(this.boxMeshProperties.quantity)<Number(this.stagevalue?.stage3Value))
      {
        this.stage3.nativeElement.value='Pass' 
      }else{
        this.stage3.nativeElement.value='Fail'
        this.failCount+=1
      } 
     
    }
    if(this.stage4)
    {
      if(Number(this.boxMeshProperties.dimensions)<Number(this.stagevalue?.stage4Value))
      {
        this.stage4.nativeElement.value='Pass'

        
      }else{
        this.stage4.nativeElement.value='Fail'
        this.failCount+=1
      } 
    }

    if(this.failCount<=1)
    {
      console.log(this.failCount)
      this.stackboxService.moveBoxtoPass(2)
      console.log("movetoPass is called")
    }
    else{
      console.log("move to right is called")
      this.stackboxService.moveBoxtoFail(4)
    }
   }


  ngOnInit(): void 
  {
    this.combinedMeshService. getProductResult$.subscribe(()=>{
      this.findResultofStage()
    })
   

   
  }

}
