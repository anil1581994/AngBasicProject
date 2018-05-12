import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-to-register',
  templateUrl: './return-to-register.component.html',
  styleUrls: ['./return-to-register.component.css']
})
export class ReturnToRegisterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  returnsignin(){

    this.router.navigate(['/login']);
    
    
    }
}
