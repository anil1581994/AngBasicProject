import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { ToDoResponse } from '../object/ToDoResponse';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Note } from '../object/Note';
import { Label } from '../object/Label';
import { LoggedUser } from '../object/LoggedUser';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Options } from 'selenium-webdriver/chrome';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { environment } from "../../environments/environment"


@Injectable()
export class HttputilService {
 

    //Hamid Added
  private allLabelSubject = new Subject<any>();
  //anil
 
//list view and grid View
  private viewSubject = new Subject<any>();
  //search
  private searchSubjcet=new Subject<any>();//ap
  searchObservable$=this.searchSubjcet.asObservable();//emitts data continousaly
  
  

  status:boolean; 
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
    let view = localStorage.getItem('cssclass');
    if(view !== undefined && view == "list-view"){
      this.status = true;
    }else{
      this.status = false;      
    }
  }
  
  // base_url = "http://localhost:8080/ToDo/";
  ///user_Url="http://localhost:8080/ToDo/";
  contentId:string;

  onDataChangeInSearch(data: any) {//ap
    console.log(data)
    this.searchSubjcet.next(data);
  }
  


  toggleView(intial?){
    if(!intial){
      this.status = !this.status;
      if (this.status) {
          localStorage.setItem('cssclass', 'list-view');
        } else {
          localStorage.setItem('cssclass', 'grid-view');
        }
    }
   this.viewSubject.next(this.status);
  }

  getStatus(){
    setTimeout(this.toggleView.bind(this,true));
  //  setTimeout(()=>{
  //   let func = this.toggleView.bind(this,true);
  //   func.apply() , func.call(),func();
  //  });
   return this.viewSubject.asObservable();
  }

 
  public urlpath : string;

  token:string;
  
    private addAuthorization():void
    {
      if(localStorage.getItem('Authorization'))
      {
        this.httpOptions.headers['Authorization'] = localStorage.getItem('Authorization');
      }
    }
    // ------------------------------------------------------------------

    postServiceData(path,model): Observable<HttpResponse<any>>{ //login,register,createNote,createcollaborator,reset/forgot password
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
    
    deleteServiceData(path,contentId?):Observable<HttpResponse<any>>{//delete note,remove collaborator
      console.log(path);
      this.addAuthorization();
      this.urlpath=this.base_url.concat(path);//deleteNote
    // return this.http.delete<any>(this.urlpath+'/'+contentId,this.httpOptions);
     return this.http.delete<any>(this.urlpath+'/'+contentId,this.httpOptions);
    }
    //------------------------------------------------------------------------
    deleteServiceData2(path):Observable<HttpResponse<any>>{//delete note,remove collaborator
      console.log(path);
      this.addAuthorization();
      this.urlpath=this.base_url.concat(path);//deleteNote
    // return this.http.delete<any>(this.urlpath+'/'+contentId,this.httpOptions);
     return this.http.delete<any>(this.urlpath,this.httpOptions);
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
  ///hamid
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


//hamid
   getAllLabel(): Observable<HttpResponse<any>>{
     this.loadAllLabel();
    return this.allLabelSubject.asObservable(); 
   }
   //anil..noteonloading

 

  //----------------------------------------------------------------------------
  getLoggedUser(path): Observable<HttpResponse<any>>{
    console.log(path);
    this.urlpath = this.base_url.concat(path);
    this.addAuthorization();   
     return this.http.get<any>(this.urlpath,this.httpOptions);    
  }
 //--------------------------------------------------------------------------------
 facebooklogin(path):Observable<any>{
  return this.http.post<any>(path,{ observe: 'response' });
}
//------------------------------------------------------------------------------
 getUrlInfo(path,model):Observable<HttpResponse<any>>{//in response,urlTitle,urlImage converrt hhtp to array[]
  this.addAuthorization();
  this.urlpath= this.base_url.concat(path);
  return this.http.post<any>( this.urlpath, model,this.httpOptions);
 }


}
