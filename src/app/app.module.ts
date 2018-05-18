import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,Injectable} from '@angular/core';
import { AppComponent } from './app.component';
import { MatFormFieldModule,MatInputModule,MatButtonModule,
         MatIconModule,MatSidenavModule,MatTooltipModule,MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './component/registration/registration.component';
import { FormsModule,ReactiveFormsModule,FormGroup,Validators,FormControl} from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './component/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttputilService} from './service/httputil.service';
import { HomeComponent } from './component/home/home.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { NoteComponent } from './component/note/note.component';
import { CanActivate} from "@angular/router";
import { AuthGuard,AlwaysLogginAuthGuard } from './auth/AuthGuard';
import { MatDialogModule} from '@angular/material/dialog';
import { UpdateNoteComponent } from './component/update-note/update-note.component';
import { TrashComponent } from './component/trash/trash.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { CommonnoteComponent } from './component/commonnote/commonnote.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import { LabelComponent } from './component/label/label.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { MatChipInputEvent} from '@angular/material';
import { ENTER, COMMA} from '@angular/cdk/keycodes';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule} from '@angular/material/chips';
import { UserService} from './service/user.service';
import { AuthInterceptor} from './AuthInterceptor';
import { NoteService} from './service/note.service';
import { NoteFilter } from './note-filter.pipe';
import { CollaboratorService} from './service/collaborator.service';
import { LabelService } from './service/label.service';
import { TrashService } from './service/trash.service';
import { ReminderService } from './service/reminder.service';
import { ArchiveService } from './service/archive.service';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, 
         LinkedInLoginProvider  } from 'angularx-social-login';
import { SocialLoginModule } from 'angularx-social-login';
import { Http ,HttpModule} from '@angular/http';
import { LinkifyPipe } from './linkify.pipe';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ReturnToRegisterComponent } from './component/return-to-register/return-to-register.component';
import { TruncatePipe } from './truncate.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ColorToolDirective } from './color-tool.directive';
import { LabeledNoteFilterPipe } from './labeled-note-filter.pipe';
import { LabeledNoteComponent } from './component/labeled-note/labeled-note.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';



export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('188389985217960')
  }
]);


  export function provideConfig() {
  return config;
}

// Route Configuration
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent, canActivate: [AlwaysLogginAuthGuard]},
  { path: 'home', component:HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'note', pathMatch: 'full' },
      { path: 'note', component: NoteComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'label', component: LabelComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: 'labelnote/:id', component: LabeledNoteComponent}
 ]
},
 { path: 'forgotPassword', component: ForgotPasswordComponent },
 { path: 'forgotpasswordStatus', component: ReturnToRegisterComponent },
 { path: 'resetpassword', component: ResetPasswordComponent },
 { path: "**" , redirectTo: 'login'}
];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    NoteComponent,
    UpdateNoteComponent,
    TrashComponent,
    ArchiveComponent,
    CommonnoteComponent,
    LabelComponent,
    ReminderComponent,
    NoteFilter,
    CollaboratorComponent,
    LinkifyPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ReturnToRegisterComponent,
    TruncatePipe,
    SearchFilterPipe,
    ColorToolDirective,
    LabeledNoteFilterPipe,
    LabeledNoteComponent,
  
  
    
  
    
  ],
  imports: [
    SocialLoginModule.initialize(config),
    SocialLoginModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    MatChipsModule,
    HttpModule,
    ToasterModule.forRoot(),
    
  
    
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents:[UpdateNoteComponent,LabelComponent,CollaboratorComponent],
  providers: [HttputilService,AuthGuard,AlwaysLogginAuthGuard,UserService,NoteService,LabelService,CollaboratorService,TrashService,ReminderService,ArchiveService,{ provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    } , { provide: AuthServiceConfig, useFactory: provideConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
