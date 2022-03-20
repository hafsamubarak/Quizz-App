import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm!:FormGroup;
  signup!:any;
  get usernameControl() {
    return this.signupForm.get('displayName') as FormControl;
  }
get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }
get emailControl() {
    return this.signupForm.get('email') as FormControl;
  }

  constructor(public firebase:FirebaseService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      displayName: ['', [Validators.required,Validators.minLength(6)]],
      email: ['', [Validators.required,Validators.email]],
    });
  }
  onSubmit(){
    this.firebase.signUp(
      this.emailControl.value,
      this.passwordControl.value,
      this.usernameControl.value
    );
    this.router.navigate(['']);
    // console.log(this.firebase.userData.usernameControl.value)
  }

}
