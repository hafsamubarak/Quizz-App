import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBG]'
})
export class ChangeBGDirective {
  @Input() isCorrect:boolean=false;

  constructor(private elmRef:ElementRef,private rendrer:Renderer2) { }
  @HostListener('click') answer(){
    if(this.isCorrect){
      this.rendrer.setStyle(this.elmRef.nativeElement,'background','green');
      this.rendrer.setStyle(this.elmRef.nativeElement,'color','white');
      this.rendrer.setStyle(this.elmRef.nativeElement,'border','2px solid green');
    }else{
      this.rendrer.setStyle(this.elmRef.nativeElement,'background','red');
      this.rendrer.setStyle(this.elmRef.nativeElement,'color','white');
      this.rendrer.setStyle(this.elmRef.nativeElement,'border','2px solid red');
    }
  //  return this.isCorrect && !this.isCorrect
  }

}
