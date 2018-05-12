import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import{ UserService } from './service/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(public authInterceptor: UserService) {}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log("In interceptor");

if(this.authInterceptor.getToken())
{
request = request.clone({
setHeaders: {
Authorization: this.authInterceptor.getToken()
}
});
}
return next.handle(request);
}

}