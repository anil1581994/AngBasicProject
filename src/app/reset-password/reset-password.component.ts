import { Component, OnInit } from '@angular/core';

import{UserService}from '../login/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserService,private router:Router) { }
  model:any={};
  jwtToken:string;
  ngOnInit() {

    console.log(window.location.search);
  }


  resetPassword(){

    console.log(this.model);
    //this.jwtToken= localStorage.getItem('Authorization');
     var check= 'resetPassword'+window.location.search;
    this.userService.getUserService(check,this.model).subscribe( response =>{
      console.log(response);
    // if(response.body.statusCode=== 100){
    
    //   console.log(" your password reset successfully");
    //   this.router.navigate(['/login']);
    //   }
    //   else{ 
    //   console.log("Invalid Password or email");
    //   }


    });
}

}
