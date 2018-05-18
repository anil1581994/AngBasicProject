import { Component,OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroupDirective, Validators,FormsModule} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup} from '@angular/forms';
import { HttputilService } from '../../service/httputil.service';
import{UserService}from '../../service/user.service';
import { ToDoResponse } from '../../object/ToDoResponse';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
model:any={};
 // constructor(private commonService:HttputilService,private router:Router) {}
    constructor(private userService: UserService,private router:Router, private toasterService: ToasterService) {
    
    }

 ngOnInit() {}
   logIn():void
   {
    console.log("sigInForm",this.model);
     this.userService.getUserService('login',this.model)
     .subscribe(response => {
        if(response.body.statusCode=== 100)
        {
         
          localStorage.setItem('Authorization',response.headers.get("Authorization"));

          this.toasterService.pop("success","login succesfully");
          // alert("login succesfully");

        //  this.router.navigate(['/home'])
          
          setTimeout (() => {
          this.router.navigate(['/home']);
           }, 1000);

        } else if(response.body.statusCode !== 100)
        {
          this.toasterService.pop("error")
            alert(response.body.msg);

        }
     },(err)=>{
       this.toasterService.pop("error",err.error.msg);
     });
    }
   fbLogin() {
    this.userService.login()
                     .then(() => {
    this.router.navigate(['/home']);
  });
 }

   // email validation pattern using validators
    emailControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
  ]);

  // password validation pattern using validators
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Za-z0-9]{8}')
  ]);
  match = new MyErrorStateMatcher();

 
 
}
