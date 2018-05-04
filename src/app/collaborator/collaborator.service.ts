import { Injectable } from '@angular/core';
//import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttputilService } from '../httputil.service';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { Collaborator } from '../Collaborator';


@Injectable()
export class CollaboratorService {
    model:any={};
    collaborators: Collaborator[];
  constructor(private httpservice: HttputilService) { }

  getLoggedUser(url: string):  Observable<HttpResponse<any>> {
        return this.httpservice.getLoggedUser(url);
    }

  
    createCollaborator(url:string, model: any):Observable<HttpResponse<any>>
    {
        //let url = "note/addCollaborator";
      //  return this.httpservice.postServiceData(url,model);
      return this.httpservice.postServiceData(url,model);
    }
     deleteCollaborator(url:string):Observable<HttpResponse<any>>
    {
       //  let url = "note/removeCollborator";
        // let url = 'note/removeCollborator?sharedUserId=' + this.model.sharedUserId + '&noteId=' + this.model.noteId;

        return this.httpservice.deleteServiceData2(url);
     }
}