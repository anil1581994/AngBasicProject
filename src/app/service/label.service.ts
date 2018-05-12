import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {HttputilService} from './httputil.service';
import { Note } from '../object/Note';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';



@Injectable()
export class LabelService {
    model:any={};
    notes: Note[];

    private allLabelSubject = new Subject<any>();
    constructor (private httpservice: HttputilService) {}
 
  createLabelService( model: any):Observable<HttpResponse<any>>
    {
        let url = "note/createlabel";
        return this.httpservice.postServiceData(url,model);
    }
    
  loadAllLabel():void{
          let path = "note/getAllLabels";
          this.httpservice.getServiceData(path)
          .toPromise().then((res)=>{
          this.allLabelSubject.next(res);
          });
      }
     
  getAllLabel(): Observable<HttpResponse<any>>{
    this.loadAllLabel();
     return this.allLabelSubject.asObservable(); 
    }
    
  updateLabel(model: any):Observable<HttpResponse<any>>
    {
        let url="note/updateLabel";
        return this.httpservice.putServiceData(url,model);
    }

   deleteLabel(model:any):Observable<HttpResponse<any>>{
    let url="note/deleteLabel";
    return this.httpservice.deleteServiceData(url,model);
   }
    
    

}