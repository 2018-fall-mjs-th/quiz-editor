import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
interface quizDisplay {
  name: string;
  originalName: string;
  numberQuestions: number;
  questions: questionDisplay[];
  naiveQuestionCheckSum: string;
}

interface questionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  animations: [
    trigger('detailsFromLeft', [
      transition('leftPosition => finalPosition', [
        animate('300ms', keyframes([
          style({ left: '-30px', offset: 0.0 }),
          style({ left: '-20px', offset: 0.25 }),
          style({ left: '-10px', offset: 0.5 }),
          style({ left: '-5px', offset: 0.75 }),
          style({ left: '0px', offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('pulseSaveCancelButtons', [
      transition('nothingToSave => somethingToSave', [
        animate('400ms', keyframes([
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 0.0 }),
          style({ transform: 'scale(1.2)', 'transform-origin': 'top left', offset: 0.5 }),
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class AppComponent {

  quizzes: quizDisplay[] = [];
  questions: questionDisplay[] = [];
  wasErrorLoadingQuizzes: boolean = false;

  constructor (private quizSvc: QuizService) {
    //console.log(this.quizSvc.getQuizzes());
    //this.quizzes = this.quizSvc.getQuizzes();
  }

  ngOnInit(){
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = (<quizDisplay[]>data).map(x => ({
        ...x,
        originalName: x.name,  
        naiveQuestionCheckSum: x.questions.map(y => y.name).join("~")
      }))       //x versus this ^     
      , error => this.wasErrorLoadingQuizzes = true
    );
  }
//test
  selectedQuiz = undefined;


  detailsFromLeftState = 'leftPosition';
  pulseButtonsState = "nothingToSave";


  selectQuiz(quiz){
    console.log(quiz);
    this.selectedQuiz = quiz;
    this.detailsAnimationState = "finalPosition";
  }

  selectedQuestion = undefined;

  selectQuestion(question){
    console.log(question);
    this.selectedQuestion = question;
  }


  addNewQuiz(){
    let q = {
      name:"New Untitled Quiz",
      originalName: name,
      numberQuestions: 0,
      questions:[],
      naiveQuestionCheckSum: ""
    };


    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  //appendingQuiz= detailsFromLeftAnimationComplete()

  addNewQuestion(){
  
    let newQuestion = "New Untitled Question";
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, {name:"New Untitled Question"}];
    this.selectQuestion(newQuestion);
    this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;
 
    console.log(this.numberOfChangedQuizzes);
    this.pulseButtonsState = "somethingToSave";
  }

  removeQuestion(deleted){
    this.selectedQuiz.questions = this.arrayRemove(this.selectedQuiz.questions, deleted);
    this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;
  }

   arrayRemove (arr, value) {

    return arr.filter(function (ele){
        return ele != value;
    });
 
 }
 

get numberOfChangedQuizzes(){
  let changedQuizzes = this.quizzes.filter(x =>
     x.name !== x.originalName
     || x.originalName === "New Untitled Question"
     || x.naiveQuestionCheckSum !== x.questions.map(y => y.name).join("~"))

  return changedQuizzes.length;
}

detailsAnimationState = "leftPosition";
detailsFromLeftAnimationComplete(){

  this.detailsAnimationState = "leftPosition";
}

  learningPromises() {"numberOfChangedQuizzes || true"
    
    console.log("learningPromises()");

    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      n => console.log(n)
    ).catch(
      e => console.log(e)
    );

    let y = this.quizSvc.getNumberOfQuizzes(false);
    console.log(y);

    y.then(
      n => console.log(n)
    ).catch(
      e => console.log(e)
    );
}
  

  async learningPromisesWithAsyncAwait() {

    console.log("learningPromisesWithAsyncAwait");
    try {
    let x = await this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    let y = await this.quizSvc.getNumberOfQuizzes(false);
    console.log(y);
    } 
    catch (e) {
      console.log(e);
    }
  }

  async learningPromisesWithAwaitAll() {

    console.log("learningPromisesWithAwaitAll");

    try {
    let x = await this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    let y = await this.quizSvc.getNumberOfQuizzes(true);
    console.log(y);

    let results = await Promise.all([x, y]);
    console.log(results);
    } 
    catch (e) {
      console.log(e);
    }
  }


  title = 'quiz-editor';

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;
  //imageWidth = '100px';

  increaseImageWidth = () => this.imageWidth *= 1.5;



}
