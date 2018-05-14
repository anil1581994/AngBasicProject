import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttputilService } from '../../service/httputil.service';
import { Note } from '../../object/Note';
import { NoteService } from '../../service/note.service';
@Component({
  selector: 'app-labeled-note',
  templateUrl: './labeled-note.component.html',
  styleUrls: ['./labeled-note.component.css']
})
export class LabeledNoteComponent implements OnInit {

public id;
public labelId:number;
model:any;
notes:Note[];
  constructor(private route: ActivatedRoute,private noteService: NoteService,private commonService:HttputilService) { }
 
  ngOnInit() {
      
      this.noteService.getAllNotes().subscribe(data => {
     this.notes=data.body;
     console.log( "getAllnotes",this.notes=data.body);
    });
     
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log('in dynamic componenet label id :',this.id);
      // In a real app: dispatch action to load the details here.
   });
    console.log("in side my componenet",LabeledNoteComponent)
  }


}
