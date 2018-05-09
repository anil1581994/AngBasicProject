import { ViewChild, ElementRef, Component, OnInit, Input,Inject,Provider, forwardRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttputilService } from '../httputil.service';
import { Label } from '../Label';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/common";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})

export class LabelComponent implements OnInit {
  model: any = {};//get form data by 2way Binding
  @Input() labels: Label[];
  contentId: String;
  showHide1:boolean;
  labelId:number;
  labelTitle:String


  clearImg = "/assets/icons/clear.svg";
  deletesvg="/assets/icons/trash.svg";
  plusImg = "/assets/icons/createlabel.svg";
  checkImg = "/assets/icons/checkmark.png";
  imgSrc: string = "/assets/icons/trash.svg";
  imgSrc1: string ="/assets/icons/checkmark.png";
  
  
  onMouseOut()
  {
   this.imgSrc = "/assets/icons/label.svg";//plus interns genrate label icon
  }

  onMouseOver()
  {
    this.imgSrc = "/assets/icons/trash.svg";//delete symbol
  }
  changeStatus()
  {
    this.showHide1 = !this.showHide1;
  }



  constructor( @Inject(MAT_DIALOG_DATA)
   private data: any,
    private commonService: HttputilService, public dialogRef: MatDialogRef<LabelComponent>,private dialog: MatDialog ) 
    { 

      this.labels = data.labels;
    }

  

  ngOnInit() 
  {    
  }
 
 createLabel(): void {
    console.log("formValue", this.model);
    this.commonService.postServiceData('note/createlabel', this.model)
      .subscribe(data => {
        console.log("label created", data);
        this.commonService.loadAllLabel();
        this.dialogRef.close();

      });
  }


  deleteLabel(contentId): void {
    console.log(contentId);
    this.commonService.deleteServiceData('note/deleteLabel', contentId).subscribe(data => {
    this.labels = data.body;
    this.commonService.loadAllLabel();
    });

  }
  // renameLabel(): void {
  //   console.log("formValue", this.data.labelId);
  //   this.commonService.putServiceData('note/updateLabel', this.data)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.commonService.loadAllLabel();
  //       this.dialogRef.close();
  //     });
  // }
  renameLabel(label): void {

    console.log("data in model",this.model);
    this.commonService.putServiceData('note/updateLabel',label)
      .subscribe(data => {
        console.log(data);
        this.commonService.loadAllLabel();
        this.dialogRef.close();
      });
  }

 
  // updateLabel(labelObj):void{
  //   this.data=labelObj;
  //   console.log(this.data);
    
  //   this.labelServiceObj.updateLabel(this.data)
  //   .subscribe(data => {
  //   console.log(data);
  //   this.dialogRef.close();
  //   });
  //   }

}
