import { Injectable } from '@angular/core';
//import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttputilService } from '../httputil.service';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';


@Injectable()
export class UserService {
  constructor(private httpservice: HttputilService) { }

    getUserService(url: string, model: any):  Observable<HttpResponse<any>> {
        return this.httpservice.postServiceData(url, model);
    }


}