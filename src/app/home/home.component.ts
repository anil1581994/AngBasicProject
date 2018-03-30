import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../httputil.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CurrentUser;
  constructor(private router:Router,private commonService:HttputilService) { }

  ngOnInit() {
  
  }
//navigate to login page after logout

logout() {
  console.log("in logout method");
   var token=localStorage.removeItem('Authorization');
     console.log(token);
     this.router.navigate(['/login']);

    }
  //   getLoggedUser():void{
  //     this.commonService.getLogedUser('getUser').subscribe(res => {
  //       this.CurrentUser= res;
  //     });
  // }
}
