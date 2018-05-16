import { Component, OnInit,Input } from '@angular/core';
import { HttputilService } from '../../service/httputil.service';
import { Note } from '../../object/Note';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{NoteService}from '../../service/note.service';
import {UpdateNoteComponent} from '../update-note/update-note.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { Label } from '../../object/Label';
import { LinkifyPipe } from '../../linkify.pipe';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';//hamid added
//import { HomeComponent } from './home.component';

@Component({
  selector: 'app-commonnote',
  templateUrl: './commonnote.component.html',
  styleUrls: ['./commonnote.component.css']
})
export class CommonnoteComponent implements OnInit {
   /**
   *Inject data from Base Note model to CommonnoteComponent
   */
  @Input() note:Note;
  labels: Label[];//for pipe
  fullImagePath: string;
  // public show:boolean = false;
  model: any = {};
  image: string;
  notes: Note[];
  statusNumber:number;//to decide pin or unpin..A

  archiveImg="/assets/icons/archive.svg";
  unArchiveImg="/assets/icons/unarchive.svg";
  reminderImg = "/assets/icons/remender.svg";
  pinIcon = "/assets/icons/pin.svg";
  unPinIcon = "/assets/icons/pinblue.svg";
  colorBoard = "/assets/icons/colorpalette.svg";
  clockImg = "/assets/icons/clock.png";
  clearImg = "/assets/icons/clear.svg";
  collaborator = "/assets/icons/collaborator.svg";
  shareduser = "/assets/icons/shareduser.svg";
 
  colors = [{
    color: '#f26f75',
    path: '/assets/icons/Red.png'
  }, {
    color: '#fcff77',
    path: '/assets/icons/lightyellow.png'
  }, {
    color: '#80ff80',
    path: '/assets/icons/green.png'
  }, {
    color: '#9ee0ff',
    path: '/assets/icons/blue.png'
  }, {
    color: '#9966ff',
    path: '/assets/icons/purple.png'
  }, {
    color: '#ff99cc',
    path: '/assets/icons/pink.png'
  }, {
    color: '#a52a2a',
    path: '/assets/icons/brown.png'
  }
  ];

  constructor(private noteService:NoteService,private dialog: MatDialog) { }

  ngOnInit() {
    // this.refreshNote();
    // this.noteService.getAllNotes().subscribe(data => {
    //   this.notes = data.body;
      
    // });
  // this.getAllLabels();
    
   // this.changeGridCss();
  }


   /**
   * To change icon of pin or unPin on the basis of note status
   * @param for status '0' unPin
   * @param for status '3' pin
   *
   */
  fetchIcon(note){
    if(note.status){
      return this.unPinIcon;
    }
   
    return this.pinIcon;
  }

   /**
   * To change  icon of archive or unarchive on the basis of note status
   * @param for status '0' unArchiveImg
   * @param for status '2' ArchiveImg
   */
   setArchiveIcon(note)
   {
    if(note.status){
      return this.archiveImg;
     }
    return this.unArchiveImg;
   }


  openDialog(note) {
    console.log("data", note);
    this.dialog.open(UpdateNoteComponent,
      {
        data: note,
        width: '600px'
      });
  }

  //collaboartor dialog box..(note,ownerId)
  openCollaboratorDialog(note, ownerId) {
    // console.log("data",note);
    this.dialog.open(CollaboratorComponent,
      {
        data: { note, ownerId },
        height: '250px',
        width: '600px'
      });
  }

  isStatus(note){
    if(this.note.status==0){ //0 means un-pin 
      this.pinNote(note);
    }else{
      this.unPinNote(note);
    }
  }

  isArchive(note){
    if(this.note.status==0){ //0 means Unarchive//2 -archive
      this.unArchive(note);
    }else{
      this.archive(note);
    }
  }
  createNote(): void {
    console.log("formValue", this.model);
    //this.commonService.postServiceData('note/createNote',this.model)
    this.noteService.createNoteService(this.model)
      .subscribe(data => {
        console.log("note created", data);
        this.refreshNote();
      });

  }
  
  refreshNote(): void {
    this.noteService.reloadAllNotes();
  }

moveTrash(note): void {
  note.status = 1;
  this.noteService.updateNote( note,'note/updateNote').subscribe(data => {
    console.log(data);
    this.refreshNote();
  });
}
archive(note): void {
  note.status = 2;
  this.noteService.updateNote( note,'note/updateNote').subscribe(data => {
    console.log(data);
    this.refreshNote();
  });
}

  unArchive(note):void{
    note.status=0;
    this.noteService.updateNote(note,'note/updateNote').subscribe(data=>{
        console.log(data)
       this.refreshNote();
    }) ;
}

pinNote(note): void {
  console.log("pin note", note);
  note.status = 3;
  this.noteService.updateNote( note,'note/updateNote').subscribe(data => {
    console.log("pin note", data);
    this.refreshNote();
  });
};
unPinNote(note): void {
  console.log("pin note", note);
  note.status = 0;
  this.noteService.updateNote( note,'note/updateNote').subscribe(data => {
    console.log("unPin note", data);
    this.refreshNote();
  });
};

updateNoteColor(note, status): void {
  console.log("change note color", note, status);
  note.status = status;
  this.noteService.updateNote( note,'note/updateNote').subscribe(data => {
    console.log("color  response", data);
    this.refreshNote();
  });
};

reminderSave(note, day) {

  if (day === 'Today') {
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder = today;
  }
  else if (day === 'Tomorrow') {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder = today;
  } else if (day === 'Next week') {

    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder = today;
  } else if (day === 'null') {
    note.reminder = null;
  } else {
    var dateObj = this.model.reminder;
    // let validDate =this.convertDate(dateObj); 
    var today = new Date(dateObj);

    // today.setDate(parseInt(newDt));
    // console.log("Date obj ",today);

    note.reminder = today;
    this.refreshNote();

  }
  this.noteService.updateNote( note,'note/updateNote').subscribe(response => {
    console.log("reminder  response", response);
    this.refreshNote();
  });
}


getAllLabels(): void {
  this.noteService.getAllLabel().subscribe(response => {
    this.labels = response.body;
  });
}
uploadImageToNote(event, note) {

  var imageName = event.target.files[0].name;
  note.image = imageName;
  console.log(this.image);
  var pattern = /image-*/;

  this.uploadImage(note);


}

uploadImage(note): void {
  this.noteService.updateNote( note,'note/uploadImage')
    .subscribe(response => {
      console.log("Image response :", response);
    });
}


addRemoveLabelToNote(noteId, labelId, operation): void {

  console.log("note updating with label");
  this.noteService.updateNote({
      params: {
        labelId: labelId,
        noteId: noteId,
        operation: operation
      }
    },'note/addLabelToNote/' + noteId + '/' + labelId + '/' + operation).subscribe(data => {
      console.log("color  response", data);
    });
};

doSomething(event, labelId, noteId) {
  this.addRemoveLabelToNote(noteId, labelId, event);
  console.log(noteId, labelId, event);
}



getScrapData(description : string): Observable<any> {
      let url = this.urlify(description);
    if(!url){
      let subjectObj =  new Subject<any>();
      // setTimeout(subjectObj.next.bind(null,[]));
      return subjectObj.asObservable();
    } 
    return this.noteService.getUrlData(url)


}

 urlify(text) :Array<string> {
   if(!text){
     text = "";
   }
  var urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  return text.match(urlRegex);
  
}


}
