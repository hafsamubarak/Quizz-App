import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { QuestionComponent } from './question/question.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'signup',component:SignUpComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:'welcome',component:WelcomeComponent},
  {path:'question',component:QuestionComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:'welcome',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
