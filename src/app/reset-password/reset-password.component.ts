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
  model:any={}
  ngOnInit() {
  }

  resetPassword(){

    console.log(this.model);
    this.userService.getUserService('resetPassword',this.model).subscribe( response =>{
    // console.log(this.model);
    // console.log("successfull", response);
    if(response.body.statusCode=== 100){
    
      console.log(" your password reset successfully");
      this.router.navigate(['/login']);
      }
      else{ 
      console.log("Invalid Password or email");
      }


    });
}

}
