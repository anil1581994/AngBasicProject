import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,Injectable} from '@angular/core';
import { AppComponent } from './app.component';
import {MatFormFieldModule,MatInputModule,MatButtonModule,
        MatIconModule,MatSidenavModule,MatTooltipModule,MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule,ReactiveFormsModule,FormGroup,Validators,FormControl} from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {HttputilService} from './httputil.service';
import { HomeComponent } from './home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NoteComponent } from './note/note.component';
import {CanActivate} from "@angular/router";
import { AuthGuard,AlwaysLogginAuthGuard } from './auth/AuthGuard';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
import { CommonnoteComponent } from './commonnote/commonnote.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import { LabelComponent } from './label/label.component';
import { ReminderComponent } from './reminder/reminder.component';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import{UserService} from './login/user.service';
import{NoteService} from './note/note.service';
import { NoteFilter } from './note-filter.pipe';
import{CollaboratorService} from './collaborator/collaborator.service';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, 
  LinkedInLoginProvider  } from 'angularx-social-login';
import { SocialLoginModule } from 'angularx-social-login';
import { Http ,HttpModule} from '@angular/http';
import { LinkifyPipe } from './linkify.pipe';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReturnToRegisterComponent } from './return-to-register/return-to-register.component';
import { TruncatePipe } from './truncate.pipe';
import { SearchFilterPipe } from './search-filter.pipe'






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


//import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';

// Route Configuration
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: RegistrationComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent, canActivate: [AlwaysLogginAuthGuard]},
  { path: 'home', component:HomeComponent,
      canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'note', pathMatch: 'full' },
      { path: 'note', component: NoteComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'label', component: LabelComponent },
      { path: 'reminder', component: ReminderComponent }
 ]
},
 { path: 'forgot', component: ForgotPasswordComponent },
 { path: 'forgotpasswordStatus', component: ReturnToRegisterComponent },
 { path: 'resetpassword', component: ResetPasswordComponent }
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
    TopNavBarComponent,
    NoteFilter,
    CollaboratorComponent,
    LinkifyPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ReturnToRegisterComponent,
    TruncatePipe,
    SearchFilterPipe
  
    
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
    
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents:[UpdateNoteComponent,LabelComponent,CollaboratorComponent],
  providers: [HttputilService,AuthGuard,AlwaysLogginAuthGuard,UserService,NoteService,CollaboratorService,{ provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] }, { provide: AuthServiceConfig, useFactory: provideConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
