import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { ToDoResponse } from './ToDoResponse';
import { Observable } from 'rxjs/Observable';
import { Note } from './Note';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Options } from 'selenium-webdriver/chrome';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';



@Injectable()
export class HttputilService {
 
  model:any={};
  
  httpOptions = {
    headers: {
      'content-type':  'application/json'
    },
  observe:  'response' as 'response'
  };
  
  constructor(private http: HttpClient) 
  {

  }
  base_url = "http://localhost:8080/ToDo/";

 
  public urlpath : string;

  notes: Note[];
  token:string;
  
    private addAuthorization():void{
      if(localStorage.getItem('Authorization')){
        this.httpOptions.headers['Authorization'] = localStorage.getItem('Authorization');
      }
    }
    postServiceData(path,model): Observable<HttpResponse<any>>{ //login,register,createNote
      console.log(path,model);
      this.addAuthorization();
      this.urlpath= this.base_url.concat(path);
      console.log(this.urlpath);
      return this.http.post<any>(this.urlpath,model,this.httpOptions);
    }
    getServiceData(path): Observable<HttpResponse<any>>{ //getnotes,
    console.log(path);
    this.addAuthorization();
    this.urlpath= this.base_url.concat(path);
    return this.http.get<any>( this.urlpath,this.httpOptions);
    }
    deleteServiceData(path,noteId):Observable<HttpResponse<any>>{//delete note
      console.log(path);
      this.addAuthorization();
      this.urlpath=this.base_url.concat(path);//deleteNote
     return this.http.delete<any>(this.urlpath+'/'+noteId,this.httpOptions);
    }
    updateServiceData(path,model) {//updateNote
       console.log(model);
       this.addAuthorization();
       this.urlpath= this.base_url.concat(path);
      // return this.http.put(this.urlpath,model,this.httpOptions);
       return this.http.post(this.urlpath,model,this.httpOptions);
    }
}