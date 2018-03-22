import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
     //parent routing
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('Authorization')) {
       
            return true;
        }
      
        this.router.navigate(['/login']);
        return false;
    }
     //parent routing
     canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('Authorization')) {
       
            return true;
        }
      
        this.router.navigate(['/login']);
        return false;
    }
   
   
    }

@Injectable()
export class AlwaysLogginAuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
     //parent routing
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!localStorage.getItem('Authorization')) {
       
            return true;
        }
      
        this.router.navigate(['/home/note']);
        return false;
    }
    
   
   
    }

