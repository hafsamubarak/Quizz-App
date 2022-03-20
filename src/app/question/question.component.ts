import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { User } from '../models/user.model';
import { FirebaseService } from '../service/firebase.service';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name:string='';
  public questionList:any=[];
  public currentQuestion:number=0;
  public points:number=0;
  counter=60;
  correctAnswer:number=0;
  wrongAnswer:number=0;
  interval:any;
  progress:string='0';
  isQuizzCompleted:boolean=false;
  userName!:User;
  constructor(private questionService:QuestionService,public firebase:FirebaseService) { }

  ngOnInit(): void {
    // this.name=localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
    // this.userName=window.history.state;
    // console.log(this.userName)
  }
  getAllQuestions(){
    this.questionService.getQuestionJSON().subscribe(res =>{
      console.log(res);
      this.questionList=res.questions;
    })
  }
  nextQuestion(){
    this.currentQuestion++;
  }
  perviousQuestion(){
    this.currentQuestion--;
  }
  answer(currentQuestionNum:number,options:any){
    if(currentQuestionNum===this.questionList.length){
      this.isQuizzCompleted=true;
      this.stopCounter();
    }
    if(options.correct){
      this.points +=10;
      // this.points=this.points+10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },1000)

    }else{
      setTimeout(()=>{
        this.wrongAnswer++;
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },1000)
      this.points -=10;
    }
  }
  startCounter(){
    this.interval=interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points -=10;
      }
    });
    setTimeout(()=>{
      this.interval.unsubscribe();
    },600000)
  }
  stopCounter(){
    this.interval.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress='0';
  }
  getProgressPercent(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
