import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ToDoResponse } from './ToDoResponse';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttputilService {
   base_url="http://localhost:8080/ToDo/";
   public urlpath;
   
  constructor(private http: HttpClient) { }
 
  postServiceData(path,user) : Observable<any> //for register
  {
    this.urlpath=this.base_url.concat(path);
 
    return this.http.post(this.urlpath,user);
}

postServiceLogin(path,user) : Observable<HttpResponse<ToDoResponse>> //for login
{
  this.urlpath=this.base_url.concat(path);

 return this.http.post<ToDoResponse>(this.urlpath,user, {observe: 'response'});
 //return this.http.post(this.urlpath,user).map((response: Response) => response);
}


}
