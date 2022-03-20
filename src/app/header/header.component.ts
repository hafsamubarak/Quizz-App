import { Component, OnInit } from '@angular/core';
import{FirebaseService} from '../service/firebase.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  local!:boolean;

  constructor(public firebase:FirebaseService) { }

  ngOnInit(): void {
    this.isLocal();
  }
  isLocal(){
    if(localStorage.getItem('user')){
      this.local=true;
    }else{
      this.local=false;
    }
  }

}
