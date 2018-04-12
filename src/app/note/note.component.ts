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

  add(event: MatChipInputEvent): void 
  {
    let input = event.input;
    let value = event.value;

    // Add our label
    if ((value || '').trim()) {
     // this.labels.push({labels.});
    }

    // Reset the input value
    if (input) 
    {
      input.value = '';
    }
  }

  removeLabel(label: any): void {
    let index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }














  fullImagePath: string;
 // public show:boolean = false;
  model:any={};

   //array to store note
  notes:Note[];
  //chip logic
  public show: boolean = false;
  showButton(){
    this.show=true;
    }
    outSideClick(){
      
    }

  archiveImg="/assets/icons/archive.svg";
  pinIcon="/assets/icons/pin.svg";
  unPinIcon="/assets/icons/pinblue.svg";
  colorBoard="/assets/icons/colorpalette.svg";
  reminderImg="/assets/icons/remender.svg";
  clockImg="/assets/icons/clock.png";
  clearImg="/assets/icons/clear.svg";

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
 
  constructor(private commonService:HttputilService,private dialog: MatDialog) {
    // this.labels
   }
      
   ngOnInit() {
          this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
          this.notes = data.body;
                });
                this.getAllLabels();
 }
    openDialog(note) {
  console.log("data",note);
    this.dialog.open(UpdateNoteComponent, 
       {
         data: note,
         width:'600px'
        
         });
  }
 
  // selectOption:void(){
  //    console.log("lodg data",data);
  //  }
  
   createNote():void{
   console.log("formValue",this.model);
  this.commonService.postServiceData('note/createNote',this.model)
   .subscribe(data=> {
    console.log("note created",data);
    this.refreshNote();
   }) ;

 }
 refreshNote():void{
   this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
     this.notes=data.body;
     console.log("notes",data);
      });
 }
  
   
     moveTrash(note):void{
        note.status=1;
         this.commonService.putServiceData('note/updateNote',note).subscribe(data=>{
            console.log(data);
           this.refreshNote();
        }) ;
    }
    archive(note):void{
      note.status=2;
      this.commonService.putServiceData('note/updateNote',note).subscribe(data=>{
          console.log(data);
         this.refreshNote();
      }) ;
  }
  pinNote(note): void {
    console.log("pin note", note);
    note.status = 3;
    this.commonService.putServiceData('note/updateNote', note).subscribe(data => {
      console.log("unArchive note", data);
      this.refreshNote();
    });
  };
  unPinNote(note): void {
    console.log("pin note", note);
    note.status = 0;
    this.commonService.putServiceData('note/updateNote', note).subscribe(data => {
      console.log("unArchive note", data);
      this.refreshNote();
    });
  };

  updateNoteColor(note,status): void {
    console.log("change note color", note,status);
    note.status = status;
    this.commonService.putServiceData('note/updateNote', note).subscribe(data => {
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
     this.commonService.putServiceData('note/updateNote', note).subscribe(response => {
     console.log("reminder  response", response);
    this.refreshNote();
    });
}
  //all curd opration label 
//how can i add labelId

 getAllLabels():void{
    this.commonService.getAllLabel().subscribe(response=> {
     this.labels=response.body;
       });
    }

    addRemoveLabelToNote(noteId,labelId,operation): void{

     console.log("note updating with label");
     this.commonService.putServiceData('note/addLabelToNote/'+noteId+'/'+labelId+'/'+operation,
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
}
