import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../httputil.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Label } from '../Label';
import { LoggedUser } from '../LoggedUser';
import {LabelComponent} from '../label/label.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LoggedUser;
  model:any={};
  labels:Label[];
  name:string;
  email:string;
  constructor(private router:Router,private commonService:HttputilService,private dialog: MatDialog) { }

  ngOnInit() {
    this.commonService.getLabelService('note/getAllLabels').subscribe(response=> {
      this.labels = response.body;
            });
  
  }
//navigate to login page after logout

logout() {
  console.log("in logout method");
   var token=localStorage.removeItem('Authorization');
     console.log(token);
     this.router.navigate(['/login']);

    }



    openDialog(label) {
      console.log("response",label);
        this.dialog.open(LabelComponent, 
           {
             height:'200px',
             width: '400px',
              });
      }
    
   getAllLabels():void{
    this.commonService.getLabelService('note/getAllLabels').subscribe(response=> {
     this.labels=response.body;
       });
    }
    getLoggedUser():void{
      this.commonService.getLoggedUser('user/loggeduser').subscribe(response => {
         this.LoggedUser= response;
         console.log(response);
     });
     }
}
