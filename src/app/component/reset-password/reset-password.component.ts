import { Component, OnInit } from '@angular/core';

import{UserService}from '../../service/user.service';
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
    //var query = 'note/removeCollborator?sharedUserId=' + this.model.sharedUserId + '&noteId=' + this.model.noteId;
    //this.jwtToken= localStorage.getItem('Authorization');
     var check= 'resetPassword'+window.location.search;
     if(this.model.password==this.model.Confirmpassword){

   this.userService.getUserService(check,this.model).subscribe( response =>{
 
   if(response.body.statusCode=== 100){
    
      console.log(" your password reset successfully");
      this.router.navigate(['/login']);
      }
      else{ 
       console.log("Invalid Password or email");
       }
   });
  }else{
    alert("ivalid ");
  }
}

}
