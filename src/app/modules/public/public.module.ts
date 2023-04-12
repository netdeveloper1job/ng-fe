import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotesComponent } from './notes/notes.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateNoteComponent } from './create-note/create-note.component';








@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    NotesComponent,
    CreateNoteComponent,
    
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    NgbDropdownModule,
    AngularSvgIconModule.forRoot()
  ],
})
export class PublicModule {}
