import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../httputil.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Label } from '../Label';
import {LabelComponent} from '../label/label.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CurrentUser;
  labels:Label[];
  constructor(private router:Router,private commonService:HttputilService,private dialog: MatDialog) { }

  ngOnInit() {
    this.commonService.getServiceData('note/getAllLabels').subscribe(response=> {
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
             height: '400px',
             width: '200px',
              });
      }
     
  //   getLoggedUser():void{
  //     this.commonService.getLoggedUser('getUser').subscribe(res => {
  //       this.CurrentUser= res;
  //     });
  // }
  getAllLabels():void{
    this.commonService.getLabelService('note/getAllLabels').subscribe(data=> {
     this.labels=data.body;
       });
  }
}
