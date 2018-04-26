import { Component, OnInit,Inject } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UpdateNoteComponent} from '../update-note/update-note.component';
import { Label } from '../Label';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {LabelComponent} from '../label/label.component';
import{NoteService}from '../note/note.service';
import {CollaboratorComponent} from '../collaborator/collaborator.component';
import { LoggedUser } from '../LoggedUser';
import { NoteFilter } from '../note-filter.pipe';
import {Collaborator}from "../Collaborator";
import {UrlData} from "../UrlData";




@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

   //chip logic
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
  model:any={};
  collaborators:Collaborator[];
  //url data extraction
  urls:UrlData[]

   //array to store note
  notes:Note[];
  //chip logic
  public show: boolean = false;
  showButton(){
    this.show=true;
    }
    username:string;
    useremail:string;
    collaboratorName:string;//
    ownerId:number
  statusClass : string=localStorage.getItem('cssclass');
  archiveImg="/assets/icons/archive.svg";
  pinIcon="/assets/icons/pin.svg";
  unPinIcon="/assets/icons/pinblue.svg";
  colorBoard="/assets/icons/colorpalette.svg";
  reminderImg="/assets/icons/remender.svg";
  clockImg="/assets/icons/clock.png";
  clearImg="/assets/icons/clear.svg";
  collaborator="/assets/icons/collaborator.svg";
  shareduser="/assets/icons/shareduser.svg";

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
  },  {
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
 
  constructor(private noteService:NoteService,private dialog: MatDialog) {
    // this.labels
   }
      
   ngOnInit() {
          this.noteService.getAllNotes().subscribe(data=> {
          this.notes = data.body;
                });
                this.getAllLabels();
                this.getUrlData();
                this.changeGridCss();
             }

            changeGridCss()
      {

             this.noteService.getStatus().subscribe((status)=>{
              this.statusClass = status? "list-view":"grid-view";
             
              if(status){   
               localStorage.setItem('cssclass','list-view');     
              }else{
                localStorage.setItem('cssclass','grid-view');
              }
       
       });
      }

    openDialog(note) 
    {
         console.log("data",note);
         this.dialog.open(UpdateNoteComponent, 
         {
          data: note,
          width:'600px'
          });
  }
 
  //collaboartor dialog box..(note,ownerId)
  openCollaboratorDialog(note,ownerId) {
   // console.log("data",note);
      this.dialog.open(CollaboratorComponent, 
         {
           data:{ note,ownerId},
          height:'250px',
          width:'600px'
           });
    }
   
  
   createNote():void{
   console.log("formValue",this.model);
  //this.commonService.postServiceData('note/createNote',this.model)
  this.noteService.createNoteService(this.model)
   .subscribe(data=> {
    console.log("note created",data);
    this.refreshNote();
   }) ;

 }
//  refreshNote():void{
//   this.noteService.getAllNotes()
//   .toPromise()
//   .then(data=>{
//     this.notes = data.body;
//       });
//  }
  
   

// refreshNote(): void {
//   this.noteServiceObj.getNotes()
//   .toPromise()
//   .then(response => {
//   this.notes = response;
//   });
  
 refreshNote():void{
   this.noteService.getAllNotes().subscribe(data=> {
    this.notes=data.body;
       console.log("notes",data);
        });
  }
  
     moveTrash(note):void{
        note.status=1;
         this.noteService.updateNote('note/updateNote',note).subscribe(data=>{
            console.log(data);
           this.refreshNote();
        }) ;
    }
    archive(note):void{
      note.status=2;
      this.noteService.updateNote('note/updateNote',note).subscribe(data=>{
          console.log(data);
         this.refreshNote();
      }) ;
  }
  pinNote(note): void {
    console.log("pin note", note);
    note.status = 3;
    this.noteService.updateNote('note/updateNote', note).subscribe(data => {
      console.log("unArchive note", data);
      this.refreshNote();
    });
  };
  unPinNote(note): void {
    console.log("pin note", note);
    note.status = 0;
    this.noteService.updateNote('note/updateNote', note).subscribe(data => {
      console.log("unArchive note", data);
      this.refreshNote();
    });
  };

  updateNoteColor(note,status): void {
    console.log("change note color", note,status);
    note.status = status;
    this.noteService.updateNote('note/updateNote', note).subscribe(data => {
      console.log("color  response", data);
      this.refreshNote();
    });
};

reminderSave(note,day){
    
  if(day==='Today'){
  var today =new Date();
  today.setHours(20);
  today.setMinutes(0);
  today.setMilliseconds(0);
  note.reminder= today;   
  }
  else if(day==='Tomorrow'){
    var today =new Date();
    today.setDate(today.getDate()+1);
  today.setHours(8);
  today.setMinutes(0);
  today.setMilliseconds(0);
  note.reminder= today;
  }else if(day==='Next week'){
    
    var today =new Date();
    today.setDate(today.getDate()+6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder= today;  
  }else if(day==='null'){
    note.reminder=null;
  }else{
    var dateObj = this.model.reminder;
    // let validDate =this.convertDate(dateObj); 
    var today = new Date(dateObj);
    
    // today.setDate(parseInt(newDt));
    // console.log("Date obj ",today);
    
    note.reminder= today;
    this.refreshNote();

  }
     this.noteService.updateNote('note/updateNote', note).subscribe(response => {
     console.log("reminder  response", response);
    this.refreshNote();
    });
}
  //all curd opration label 
//how can i add labelId

   getAllLabels():void{
    this.noteService.getAllLabel().subscribe(response=> {
        this.labels = response.body;
      });
    }

    addRemoveLabelToNote(noteId,labelId,operation): void{

     console.log("note updating with label");
     this.noteService.updateNote('note/addLabelToNote/'+noteId+'/'+labelId+'/'+operation,
     {
       params:{
         labelId:labelId,
         noteId:noteId,
         operation:operation

        }
    }).subscribe(data => {
      console.log("color  response", data);
      });
     };

    doSomething(event,labelId, noteId)
    {
      this.addRemoveLabelToNote(noteId,labelId,event);
      console.log(noteId,labelId,event);
     }
    
    //  handleInputChange(event,url,noteId){
    //   this.getUrlData(event,url,noteId);
    //   console.log(event,url);
    //  }

    //  getUrlData(event,url,noteId){
    //  this.noteService.getUrlData(this.model);
    //  }
    
    ValidateUrl():any[]
    {
     let urls=[];
     let str="http://www.thehindu.com,https://timesofindia.indiatimes.com/city/pune/imd-data-shows-maha-hottest-state-in-april-so-far/articleshow/63917182.cms,https://timesofindia.indiatimes.com/city/pune/imd-data-shows-maha-hottest-state-in-april-so-far/articleshow/63917182.cms";
     var urlRegEx = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
      
    //  return str.match(urlRegEx).map((str)=>str.trim());
      str.replace(urlRegEx,strObj => {
        urls.push(strObj);
        return strObj;
      });
      return urls;

    //   if(urlRegEx.test(str))//return true if match
    //  {
      
    //      urls.push(str);//add into the array
    //      console.log(urls);
    //      alert('valid url');
     
    //  }else{
    //     alert('Invalid URL');
    //  }
    //     console.log(urls);
    //     return urls;
       
    }

     getUrlData():void{
       this.urls=this.ValidateUrl();
       console.log("formValue",this.urls);
      this.noteService.getUrlData(this.urls)
     .subscribe(data=> {
     console.log("url",data);
     this.refreshNote();
    }) ;
 
  }
}
