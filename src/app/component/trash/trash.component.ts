import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../../service/httputil.service';
import { Note } from '../../object/Note';
import {TrashService}from '../../service/trash.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  notes:Note[];
 


  constructor(private trashService:TrashService) { }

  ngOnInit() {
    this.trashService.getAllNotes().subscribe(data=> {
  
      this.notes = data.body;
                  });
  }
  refreshNote():void{//getAllnotes
    this.trashService.getAllNotes().subscribe(data=> {
      this.notes=data.body;
       });
  }

  restore(note):void{
    note.status=0;
    this.trashService.restoreNote(note).subscribe(data=>{
        console.log(data)
       this.refreshNote();
    }) ;
}

deleteForever(noteId):void{
  console.log(noteId);
  this.trashService.deleteNoteForever(noteId).subscribe(data=>{this.notes=data.body;
    this.refreshNote();
 });

}


}
