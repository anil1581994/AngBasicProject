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
  public LoggedUser;
  model:any={};
  labels:Label[];
  username:string;
  useremail:string;

  public grid:boolean = false;
  public buttonName:any = 'Show';


  constructor(private router:Router,private commonService:HttputilService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllLabels();
  }
//navigate to login page after logout
changeCSS()
{
  this.commonService.toggleView();
}
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
}
