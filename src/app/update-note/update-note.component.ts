import { ViewChild,ElementRef,Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {
  @ViewChild('title') title:ElementRef;
  @ViewChild('description') description:ElementRef;


  model:any={};
  //array to store note
 notes:Note[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: Note,
              private commonService:HttputilService,
              public dialogRef: MatDialogRef<UpdateNoteComponent>) { }

  ngOnInit() {
    this.title.nativeElement.innerHTML = this.data.title;
    this.description.nativeElement.innerHTML = this.data.description;
  
  }

  refreshNote():void{
    this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
      this.notes=data.body;

       });
  }

  updateNote():void{
    console.log("formValue",this.data);
   this.commonService.putServiceData('note/updateNote',this.data)
    .subscribe(data=> {
     console.log(data);
     this.refreshNote();
     this.dialogRef.close();
    }) ;
 
  }
}
