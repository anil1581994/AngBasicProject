import { ViewChild,ElementRef,Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttputilService } from '../httputil.service';
import { Label } from '../Label';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  model:any={};
 

constructor(private data: Label,
  private commonService:HttputilService, public dialogRef: MatDialogRef<LabelComponent>) { }

  ngOnInit() {
  }
  
   
     
  createLabel():void{
    console.log("formValue",this.model);
   this.commonService.postServiceData('note/createLabel',this.model)
    .subscribe(data=> {
     console.log("label created",data);
     this.dialogRef.close();
      
    }) ;
 
  }
  
}
