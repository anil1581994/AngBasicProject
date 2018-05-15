import { ViewChild, ElementRef, Component, OnInit, Input,Inject,Provider, forwardRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttputilService } from '../../service/httputil.service';
import { Label } from '../../object/Label';
import { Subscription } from 'rxjs';
import {LabelService}from '../../service/label.service';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/common";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})

export class LabelComponent implements OnInit,OnDestroy {
  model: any = {};//get form data by 2way Binding
  @Input() labels: Label[];
  labelImages : Array<string> = [];
  contentId: String;
  showHide1:boolean;
  labelId:number;
  labelTitle:String
  unsubscibeObj:Subscription;

  clearImg = "/assets/icons/clear.svg";
  deletesvg="/assets/icons/trash.svg";
  plusImg = "/assets/icons/createlabel.svg";
  checkImg = "/assets/icons/checkmark.png";
  imgSrc: string = "/assets/icons/label.svg";
  imgSrc1: string ="/assets/icons/checkmark.png";
  
  
  onMouseOut(i)
  {
   this.imgSrc = "/assets/icons/label.svg";//plus interns genrate label icon
   this.labelImages[i] = this.imgSrc;
   console.log(this.labelImages , i)
  }

  onMouseOver(i)
  {
    this.imgSrc = "/assets/icons/trash.svg";//delete symbol
    this.labelImages[i] = this.imgSrc;
  }
  changeStatus()
  {
    this.showHide1 = !this.showHide1;
  }



  constructor( @Inject(MAT_DIALOG_DATA)
   private data: any,
    private labelService: LabelService, public dialogRef: MatDialogRef<LabelComponent>,private dialog: MatDialog ) 
    { 

      this.labels = data.labels;
      this.labelImages = data.labels.map(()=>this.imgSrc);
    }

  

  ngOnInit() 
  {    
  this.labelService.getAllLabel();
  }

 createLabel(): void {
    console.log("formValue", this.model);
   this.unsubscibeObj=this.labelService.createLabelService(this.model)
      .subscribe(data => {
        console.log("label created", data);
        this.labelService.getAllLabel();
        this.dialogRef.close();

      });
  }


  deleteLabel(contentId): void {
    console.log(contentId);
    this.unsubscibeObj=this.labelService.deleteLabel(contentId).subscribe(data => {
    this.labels = data.body;
    this.labelService.getAllLabel();
    });

  }
 
  renameLabel(label): void {

    console.log("data in model",this.model);
    this.unsubscibeObj=this.labelService.updateLabel(label)
      .subscribe(data => {
        console.log(data);
        this.labelService.getAllLabel();
        this.dialogRef.close();
      });
  }
 ngOnDestroy(){
   this.unsubscibeObj.unsubscribe();
   console.log("unSubscribe done");

 }
 
}
