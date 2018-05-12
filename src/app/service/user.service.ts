
//import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttputilService } from './/httputil.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';


import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http/src/headers';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';


declare const FB:any;
@Injectable()
export class UserService 
   {
   
 
     constructor(private http: AuthHttp,private httpservice: HttputilService, private router : Router) {
    // (function(d, s, id){
    // var js, fjs = d.getElementsByTagName(s)[0];
    // if (d.getElementById(id)) {return;}
    // js = d.createElement(s); js.id = id;
    // js.src = '//connect.facebook.net/en_US/sdk.js';
    // fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
    
    // window.fbAsyncInit = () => {
    // FB.init({
    // appId : '188389985217960',
    // status : false, // the SDK will attempt to get info about the current user immediately after init
    // cookie : false, // enable cookies to allow the server to access
    // // the session
    // xfbml : false, // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
    // version : 'v2.8' // use graph api version 2.5
    // });
    // FB.AppEvents.logPageView();
    // };
    
     } 
   
    
   
    getUserService(url: string, model: any):  Observable<HttpResponse<any>> {
     return this.httpservice.postServiceData(url, model);
     }

    login(){
    return new Promise((resolve, reject) => {
        FB.login(result => {
       console.log(result);
       }, {scope: 'public_profile,email'})

       });
    }

    public getToken(): string {
        return localStorage.getItem('Authorization');
         }



    }


