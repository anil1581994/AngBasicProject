import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../../service/httputil.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Label } from '../../object/Label';
import { LoggedUser } from '../../object/LoggedUser';
import {LabelComponent} from '../label/label.component';
import {FormsModule, FormGroup, FormControl, FormBuilder} from '@angular/forms'
import { NoteService } from '../../service/note.service';
import { Note } from '../../object/Note';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public LoggedUser;
 // color='red';
  model:any={};
  labels:Label[];//
  username:string;
  useremail:string;
  homeForm: FormGroup;
  inputFormControl: FormControl;
  // subscription: Subscription;
  color:string;
  labelId:number
  labelTitle:String
 
  //array to store note
  notes: Note[];

  public grid:boolean = false;//view
  public buttonName:any = 'Show';


  constructor(private builder: FormBuilder,private router:Router,private commonService:HttputilService,
    private dialog: MatDialog) {

    this.inputFormControl = new FormControl();
    this.homeForm = this.builder.group({
    inputFormControl: this.inputFormControl //get home html input
    }); 

    this.router.events.subscribe((event) => {
      console.log(event);
       if(event['url'] && event['url'] == '/') {
          console.log('Home page');
          //logic to change color of toolk bar along with url reoue change
          
       }
      });

     }
     
     ngOnInit(){
      this.getAllLabels();
      this.searchText();//search api
     }


   //to search my text
    searchText(){
      this.homeForm.valueChanges.subscribe(
        (formData) => {
          console.log(formData.inputFormControl);
          this.commonService.onDataChangeInSearch(formData.inputFormControl);
        });
    }
 
  //navigate to login page after logout
changeCSS()
{
  this.commonService.toggleView();
}
   //logout
logout() {
  console.log("in logout method");
   var token=localStorage.removeItem('Authorization');
     console.log(token);
     this.router.navigate(['/login']);

    }
  //at side navbar
    openLabelDialog(label) {
       this.dialog.open(LabelComponent, 
           {
            height:'325px',
              width: '300px',
             data : {
               labels : this.labels
           }
            });
          }
      

   getAllLabels():void{
    this.commonService.getAllLabel().subscribe(response=> {
     this.labels=response.body;
       });
    }
    getLoggedUser():void{
      this.commonService.getLoggedUser('user/loggeduser').subscribe(response => {
        console.log("response",response.body);
        this.username=response.body.name;
        this.useremail=response.body.email;
        this.LoggedUser= response;
         
     });
     }
     show()
     {
      this. grid= false;
     }
     //getLabeld------>Notes
     //(click)="getLabeledNotes(label.labelId)"
     getLabeledNotes(labelId):void{
        let url='note/getlabeldnotes?labelId='+this.labelId;
        //routimg url;home/labelnote/:label
        this.commonService.getServiceData(url).subscribe(response=> {
        this.notes=response.body;
          });
     }
}
