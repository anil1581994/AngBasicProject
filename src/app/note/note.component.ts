import { Component, OnInit,Inject } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UpdateNoteComponent} from '../update-note/update-note.component';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  fullImagePath: string;
  public show:boolean = false;
  model:any={};
   //array to store note
  notes:Note[];
 
  constructor(private commonService:HttputilService,private dialog: MatDialog) {
 
  
   }
      
   ngOnInit() {

    this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
  
    this.notes = data.body;
                });
 }
    openDialog(note) {
  console.log("data",note);
    this.dialog.open(UpdateNoteComponent, 
       {
         data: note,
         width:'600px'
        
              });
  }
  
   
   createNote():void{
   console.log("formValue",this.model);
  this.commonService.postServiceData('note/createNote',this.model)
   .subscribe(data=> {
    console.log("note created",data)
    this.refreshNote();
   }) ;

 }
 refreshNote():void{//getAllnotes
   this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
     this.notes=data.body;
      });
 }
  //  deleteNote(noteId):void{
  //     console.log(noteId);
  //     this.commonService.deleteServiceData('note/deleteNote',noteId).subscribe(data=>{this.notes=data.body;
  //       this.refreshNote();
  //    });
    
  //   }
//     updateNote():void{
//       console.log("formValue",this.model);
//      this.commonService.updateServiceData('note/updateNote',this.model)
//       .subscribe(data=> {
//        console.log(data)
//        this.refreshNote();
//       }) ;
   
// }
   /* move trash */
  moveTrash(note):void{
        note.status=1;
        this.commonService.putServiceData('note/updateNote',note).subscribe(data=>{
            console.log(data)
           this.refreshNote();
        }) ;
    }
   
}
