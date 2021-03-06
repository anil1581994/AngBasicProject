import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef,Input,Inject,Provider, forwardRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoggedUser } from '../../object/LoggedUser';
import{CollaboratorService}from '../../service/collaborator.service';
import { Collaborator } from '../../object/Collaborator';
import { Note } from '../../object/Note';
import { ToDoResponse } from '../../object/ToDoResponse';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  shareduser="/assets/icons/shareduser.svg";
  collaborators: Collaborator[];
  model: any = {};
  public LoggedUser;
  username:string;
  useremail:string;
  sharedUserId:string;
  data : Note;
  constructor(private collaboratorService:CollaboratorService,@Inject(MAT_DIALOG_DATA) private dataObj: { note : Note }) {
    this.data = dataObj.note;
  }

  ngOnInit() {
    console.log('data in collaborator object ',this.data);
  
    this.getLoggedUser();
  }
  getLoggedUser():void{
      this.collaboratorService.getLoggedUser('user/loggeduser').subscribe(response => {
      console.log("response",response.body);
      this.username=response.body.name;
      console.log( this.username);
      this.useremail=response.body.email;
     console.log( this.useremail);
      this.LoggedUser= response;
       
   });
   }

  
    
    addCollaborator():void{
      this.model.noteId = this.data.noteId;
    
      console.log(this.data.noteId);
      console.log(this.model.noteId);
      var query = 'note/addCollaborator?sharedUserId=' + this.model.sharedUserId + '&noteId=' + this.model.noteId;

      this.collaboratorService.createCollaborator(query, {})
       // this.collaboratorService.createCollaborator(this.model)
       .subscribe(response=>{
       console.log(response.body.status);
       if(response.body.status===1)
        {
         alert("collaborator created");
       
        } else if(response.body.status===-1)
        {
           alert("This email already exists");
        }
       else{
       alert("This email doesnot exists in DataBase UnAuthorized User");
       }
     }) ;
   }
  
   removeCollaborator(sharedUserId): void { //shaerdUserId,noteId  collaborator
     this.model.noteId = this.data.noteId;
     this.model.sharedUserId = sharedUserId;
    console.log(this.model);
    var query = 'note/removeCollborator?sharedUserId=' + this.model.sharedUserId + '&noteId=' + this.model.noteId;
    this.collaboratorService.deleteCollaborator(query).subscribe(data => {
    this.collaborators = data.body;

     });

   }
}
