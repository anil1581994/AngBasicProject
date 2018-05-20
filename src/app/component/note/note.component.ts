import { Component, Inject, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttputilService } from '../../service/httputil.service';
import { Note } from '../../object/Note';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Label } from '../../object/Label';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { LabelComponent } from '../label/label.component';
import { NoteService } from '../../service/note.service';
import { CollaboratorComponent } from '../../component/collaborator/collaborator.component';
import { LoggedUser } from '../../object/LoggedUser';
import { NoteFilter } from '../../note-filter.pipe';
import { Collaborator } from "../../object/Collaborator";
import { UrlData } from "../../object/UrlData";
import { LinkifyPipe } from '../../linkify.pipe';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms'
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit,OnDestroy {
  //search
  noteForm: FormGroup;
  inputFormControl:FormControl;
  searchText: string;
  //subscription: Subscription;
  unsubscibeObj:Subscription;
  //matchip logic
  public checked: boolean = false;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  //opeartion status for to add and remove label
  public operation: boolean = false;
  labels: Label[];//for pipe
  fullImagePath: string;
  // public show:boolean = false;
  model: any = {};
  collaborators: Collaborator[];
  //url data extraction
  urls: UrlData[]
  image: string;
  statusNumber:number;
  imageUrl: string
  //array to store note
  
  notes: Note[];
  //matchipchip logic
  status : number//
  flexSize : string;
  public show: boolean = false;
  showButton() {
    this.show = true;
  }
  username: string;
  useremail: string;
  collaboratorName: string;
  ownerId: number;
  gridStatus : boolean;
  marginTop : string;
  archiveImg = "/assets/icons/archive.svg";
  pinIcon = "/assets/icons/pin.svg";
  unPinIcon = "/assets/icons/pinblue.svg";
  colorBoard = "/assets/icons/colorpalette.svg";
  reminderImg = "/assets/icons/remender.svg";
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

  constructor(private commonService:HttputilService,private noteService: NoteService, private dialog: MatDialog) {
   commonService.searchObservable$.subscribe(
      formData => {
       this.searchText = formData;
        console.log("in  note component, ", formData);
    });
  }

  ngOnInit() {
    this.readNotes();
    this.getAllLabels();
    this.changeGridCss();
  }

  changeGridCss() {

    this.noteService.getStatus().subscribe((status) => {
     this.marginTop = status ? "10px" : "0px";
      this.flexSize = status ? "100%" : "30%";
    });
  }

  createNote(): void {
    this.unsubscibeObj = this.noteService.createNoteService(this.model)
                                            .subscribe(data => {
                                              this.refreshNote();
                                            });
  }
  
  refreshNote() : void{
    this.noteService.reloadAllNotes();
  }

  readNotes(): void {
    this.unsubscibeObj=this.noteService.getAllNotes().subscribe(data => {
      console.log("my notes",data)
      if(data.body){
      this.notes = data.body.map(noteObj =>{
        if(this.urlify(noteObj.description))
        noteObj.urlPromise = this.getScrapData(noteObj.description).map(res=>{
          return res.body;   
        });
        return noteObj;
      })
    }else{
      // alert("issue");
    }
    });
  }

getAllLabels(): void {
  this.unsubscibeObj=this.noteService.getAllLabel().subscribe(response => {
    this.labels = response.body;
  });
}

getScrapData(description : string): Observable<any> {
      let url = this.urlify(description);
    if(!url)
    {
        let subjectObj =  new Subject<any>();
       return subjectObj.asObservable();
     } 
    return this.noteService.getUrlData(url)
  }

 urlify(text) :any {//Array<string>
  if(!text){
    text = "";
  }
  
  var urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
 return text.match(urlRegex);
  }
  
  ngOnDestroy(){
    this.unsubscibeObj.unsubscribe();
    console.log(" note service has been unSubscribe successfully");
 
  }
  

}
