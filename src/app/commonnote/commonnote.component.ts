import { Component, OnInit,Input } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{NoteService}from '../note/note.service';
import {UpdateNoteComponent} from '../update-note/update-note.component';

@Component({
  selector: 'app-commonnote',
  templateUrl: './commonnote.component.html',
  styleUrls: ['./commonnote.component.css']
})
export class CommonnoteComponent implements OnInit {

  @Input() note:Note;
  
  archiveImg="/assets/icons/archive.svg";

  constructor(private noteService:NoteService,private dialog: MatDialog) { }

  ngOnInit() {
  }
    openDialog(note) {
    console.log("data",note);
    this.dialog.open(UpdateNoteComponent, 
    {
     data: note,
     width:'600px'
     });
    }
}
