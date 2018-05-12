import { Component,OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroupDirective, Validators,FormsModule} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup} from '@angular/forms';
import { HttputilService } from '../../service/httputil.service';
import{UserService}from '../../service/user.service';

import { ToDoResponse } from '../../object/ToDoResponse';
import { Router } from '@angular/router';

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
    constructor(private userService: UserService,private router:Router) {}

 ngOnInit() {}
   logIn():void
   {
    console.log("sigInForm",this.model);
     this.userService.getUserService('login',this.model)
     .subscribe(response => {
        if(response.body.statusCode=== 100)
        {
         
          localStorage.setItem('Authorization',response.headers.get("Authorization"));
             alert("login succesfully");
             //make service to get token
             
          this.router.navigate(['/home'])
        } else if(response.body.statusCode !== 100)
        {
            alert(response.body.msg);
        }
     });
    //  console.log("sigInForm",this.data);

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
