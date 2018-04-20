import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { ToDoResponse } from './ToDoResponse';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';//hamid added

import { Note } from './Note';
import { Label } from './Label';
import { LoggedUser } from './LoggedUser';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Options } from 'selenium-webdriver/chrome';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { environment } from "../environments/environment"


@Injectable()
export class HttputilService {
 

    //Hamid Added
  private allLabelSubject = new Subject<any>();

  model:any={};
  
  httpOptions = {
    headers: {
      'content-type':  'application/json'
    },
  observe:  'response' as 'response',
  params : {}
  };
  
  base_url = environment.base_url;
  constructor(private http: HttpClient) 
  {
    
  }
  
  // base_url = "http://localhost:8080/ToDo/";
  ///user_Url="http://localhost:8080/ToDo/";
  contentId:string;

 
  public urlpath : string;

  token:string;
  
    private addAuthorization():void{
      if(localStorage.getItem('Authorization')){
        this.httpOptions.headers['Authorization'] = localStorage.getItem('Authorization');
      }
    }
    // ------------------------------------------------------------------

    postServiceData(path,model): Observable<HttpResponse<any>>{ //login,register,createNote,createcollaborator
      console.log(path,model);
      this.addAuthorization();
      this.urlpath= this.base_url.concat(path);
      console.log(this.urlpath);
      return this.http.post<any>(this.urlpath,model,this.httpOptions);
    }
    // ----------------------------------------------------------------

    getServiceData(path): Observable<HttpResponse<any>>{ //getnotes,
    console.log(path);
    this.addAuthorization();
    this.urlpath= this.base_url.concat(path);
    return this.http.get<any>( this.urlpath,this.httpOptions);
    }
    //--------------------------------------------------------------------
    
    deleteServiceData(path,contentId):Observable<HttpResponse<any>>{//delete note
      console.log(path);
      this.addAuthorization();
      this.urlpath=this.base_url.concat(path);//deleteNote
     return this.http.delete<any>(this.urlpath+'/'+contentId,this.httpOptions);
    }
    //--------------------------------------------------------------------------
    putServiceData(path,model,option?) {//updateNote..option is optional param some api
       console.log(model);
       this.addAuthorization();
       this.urlpath= this.base_url.concat(path);
      // return this.http.put(this.urlpath,model,this.httpOptions);
      if(option){
        for (const index in option) {
          if (option.hasOwnProperty(index)) {
            this.httpOptions[index] = option[index];
          }
        }
      }
      // this.httpOptions.params={"labelId":10};      
       return this.http.put(this.urlpath,model,this.httpOptions);
    }
   //----------------------------------------------------------------------
    //Hamid Added
    loadAllLabel():void{
      let path = "note/getAllLabels";
      this.urlpath = this.base_url.concat(path);
      this.addAuthorization();
      this.http.get<any>(this.urlpath,this.httpOptions)
        .toPromise().then((res)=>{
        this.allLabelSubject.next(res);
        });
    }
   //------------------------------------------------------------------------
    //Hamid Added
   getAllLabel(): Observable<HttpResponse<any>>{
     this.loadAllLabel();
    return this.allLabelSubject.asObservable(); 
   }
  //----------------------------------------------------------------------------
  getLoggedUser(path): Observable<HttpResponse<any>>{
    console.log(path);
    this.urlpath = this.base_url.concat(path);
    this.addAuthorization();   
     return this.http.get<any>(this.urlpath,this.httpOptions);    
  }

}