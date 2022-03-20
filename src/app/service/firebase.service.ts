import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn=false;
  userData:any;
  userName!:User;

  constructor(public fireBaseAuth:AngularFireAuth,public ngZone:NgZone,public router:Router,public afs:AngularFirestore) {
    const currentUSer$=this.fireBaseAuth.authState.subscribe(user=>{
      if(user){
        this.userData=user;
        localStorage.setItem('user',this.userData.uid);
        localStorage.getItem('user');
      }
    })
  }
  signIn(email:string,password:string){
    return this.fireBaseAuth.signInWithEmailAndPassword(email,password)
    .then((res)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['']);
      });
    }).then(
      ()=>{
        window.location.reload();
      }
    )
    .catch((error)=>{
      window.alert(error.message);
    })
  }
  signUp(email:string,password:string,displayName:string){

    return this.fireBaseAuth.createUserWithEmailAndPassword(email,password)
    .then((res)=>{
      console.log(displayName)
      // console.log(this.userName.displayName)
      this.setUserData(res.user as unknown as User);
      this.router.navigate(['']);
    }).then(
      ()=>{
        window.location.reload();
      }
    )
    .catch((error)=>{
      window.alert(error.message);
    })
  }

  setUserData(user:User){
    // const userRef:AngularFirestoreDocument<any>=this.afs.doc(`users/${user.uid}`);

    this.userData={
      uid:user.uid,
      displayName:user.displayName,
      email:user.email,
      password:user.password
    }
    console.log(this.userData);
    // return userRef.set(this.userData,{
    //   merge:true
    // })
  }
  authLogin(provider:any){
    return this.fireBaseAuth.signInWithPopup(provider)
    .then((res)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['']);
      })
    }).then(()=>{
      window.location.reload();
    }).catch((error)=>{
      window.alert(error);
    })
  }
  signOut(){
    return this.fireBaseAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['']);
    }).then(()=>{
      window.location.reload();
    })
  }
}

