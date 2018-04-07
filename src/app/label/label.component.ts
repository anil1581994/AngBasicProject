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

// const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = new Provider(
//   NG_VALUE_ACCESSOR, {
//       useExisting: forwardRef(() => InlineEditComponent),
//       multi: true
//   });

export class LabelComponent implements OnInit {
  model: any = {};//get form data by 2way Binding
  @Input() labels: Label[];
  contentId: String;
  showHide1:boolean;
 

  clearImg = "/assets/icons/clear.svg";
  plusImg = "/assets/icons/createlabel.svg";
  checkImg = "/assets/icons/checkmark.png";




  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private commonService: HttputilService, public dialogRef: MatDialogRef<LabelComponent>) { 

      this.labels = data.labels;
    }
    changeShowStatus()
   {
     this.showHide1 = !this.showHide1;
   }


  ngOnInit() {    
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
  updateLabel(): void {
    console.log("formValue", this.data);
    this.commonService.putServiceData('note/updateLabel', this.data)
      .subscribe(data => {
        console.log(data);
        this.commonService.loadAllLabel();
        this.dialogRef.close();
      });
  }

}
