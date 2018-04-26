import { Injectable } from '@angular/core';

import {HttputilService} from '../httputil.service';
import { Note } from '../Note';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class NoteService {
    model:any={};
    notes: Note[];

    constructor (private httpservice: HttputilService) {}

    
         
        createNoteService( model: any):Observable<HttpResponse<any>>
        {
            let url = "note/createNote";
            return this.httpservice.postServiceData(url,model);
        }

        getAllNotes():Observable<HttpResponse<any>>
        {
            let url = "note/getAllNotes";
            return this.httpservice.getServiceData(url);
        }
       
        updateNote(url: string, model: any):Observable<HttpResponse<any>>
        {
            //let url="note/updateNote";
            return this.httpservice.putServiceData(url,model);
        }
        getAllLabel():Observable<HttpResponse<any>>
        {
          
           return this.httpservice.getAllLabel();
        }
        getLoggedUser(url: string):Observable<HttpResponse<any>>
        {
            return this.httpservice.getLoggedUser(url);
        }

     getStatus():Observable<HttpResponse<any>>
     {
        return this.httpservice.getStatus();
     }
     getUrlData(model: any):Observable<HttpResponse<any>>
     {  
         let url="note/getUrls"
         return this.httpservice.getUrlInfo(url,model);
     }
}