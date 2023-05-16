import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService as AuthGuard } from 'src/app/core/service/auth-guard.service';
import { RoleGuardService as RoleGuard } from 'src/app/core/service/role-guard.service';
import { NotesComponent } from './notes/notes.component';
import { CreateNoteComponent } from './create-note/create-note.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      
      {
        path: 'notes',
        data: { expectedRole: 'user' },
        canActivate: [AuthGuard],
        component: NotesComponent,
      },
      {
        path: 'create-notes',
        data: { expectedRole: 'user' },
        canActivate: [AuthGuard],
        component: CreateNoteComponent,
      },
      {
        path: 'update-notes/:noteId',
        data: { expectedRole: 'user' },
        canActivate: [AuthGuard],
        component: CreateNoteComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      
     
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
