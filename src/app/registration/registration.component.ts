import { Component,OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroupDirective, Validators,FormsModule,FormGroup} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
//import { FormGroup} from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { ToDoResponse } from '../ToDoResponse';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
model:any={};
  constructor(private commonService:HttputilService) {

  }
  //register api 
  register():void{
    console.log("formValue",this.model);
  this.commonService.postServiceData('register',this.model).subscribe(data=> console.log(data)) ;

  
  }
  ngOnInit(){}
  // name validation pattern using validators

   nameControl = new FormControl('', [
   Validators.required,
   Validators.pattern('^[a-zA-Z ]*$')
 ]);
  // email validation pattern using validators
   emailControl = new FormControl('', [
   Validators.required,
   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
 ]);
//^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}
 // password validation pattern using validators
 passwordControl = new FormControl('', [
   Validators.required,
   Validators.pattern('[A-Za-z0-9]{8}'
 )
 ]);
    //confirm  password validation pattern using validators
    confirm_passwordControl= new FormControl('', [
  Validators.required,
  Validators.pattern('[A-Za-z0-9]{8}'
)
]);

 // mobile validation pattern using validators
 mobileNumberControl = new FormControl('', [
   Validators.required,
   Validators.pattern('[0-9]{10}')
 ]);
 match = new MyErrorStateMatcher();
 

}
