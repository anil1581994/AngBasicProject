import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  notes:Note[];

  constructor(private commonService:HttputilService) { }

  ngOnInit() {
    this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
  
      this.notes = data.body;
                  });
  }
  refreshNote():void{//getAllnotes
    this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
      this.notes=data.body;
       });
  }

  restore(note):void{
    note.status=0;
    this.commonService.putServiceData('note/updateNote',note).subscribe(data=>{
        console.log(data)
       this.refreshNote();
    }) ;
}

deleteForever(noteId):void{
  console.log(noteId);
  this.commonService.deleteServiceData('note/deleteNote',noteId).subscribe(data=>{this.notes=data.body;
    this.refreshNote();
 });

}


}
