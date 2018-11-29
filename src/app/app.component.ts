import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { ViewEncapsulation } from '@angular/core';
import {
  trigger
  , state
  , style
  , animate
  , transition
  , keyframes
} from '@angular/animations';


interface quizDisplay {
  name: string;
  originalName: string;

  numberQuestions: number;

  questions: questionDisplay[];
  naiveQuestionChecksum: string;
}

interface questionDisplay {
  name: string;
}
@Component({
  selector: 'app-root'
  , templateUrl: './app.component.html'
  , styleUrls: ['./app.component.css']
  , encapsulation: ViewEncapsulation.None
  , animations: [
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
    ])
    , trigger('pulseSaveCancelButtons', [
      transition('nothingToSave => somethingToSave', [
        animate('100ms', keyframes([
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 0.0 }),
          style({ transform: 'scale(1.05)', 'transform-origin': 'top left', offset: 0.5 }),
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 1.0 })
        ]))
      ])
    ])
  ]
})

export class AppComponent {
  // ********************************************* Header Information and initializers variables
  title = 'quiz-editor';
  quizzes: quizDisplay[] = [];
  wasErrorLoadingQuizzes: boolean = false;
  selectedQuiz = undefined;
  constructor (private quizSvc: QuizService) {}
  detailsAnimationState = "leftPosition";
  


  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = (<quizDisplay[]> data).map(x => ({
        ...x
        , originalName: x.name
        , naiveQuestionChecksum: x.questions.map(y => y.name).join("~")
      }))
      , error => this.wasErrorLoadingQuizzes = true
    );
  }
  
// *************************************************************************************************
// **                                     Process Quizzes                                         **
// *************************************************************************************************
  selectQuiz(q) {
    this.selectedQuiz = q;
    this.detailsAnimationState = "finalPosition";
  }

  addNewQuiz() {
    let q = { name: "New Untitled Quiz"
        , originalName: "New Untitled Quiz"
        , numberQuestions: 0
        , questions: []
        , naiveQuestionChecksum: ""
    };
    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }
  
  reloadQuizzes(){
    console.log("What's up?!");
  }



// *************************************************************************************************
// **                                    Process Questions                                        **
// *************************************************************************************************
  addNewQuestion(selectedQuiz) {
    selectedQuiz.questions = [...selectedQuiz.questions, {"name": "New untitled question"}];
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;
  }

  removeQuestion(selectedQuiz, selectedQuestion) {
    selectedQuiz.questions = selectedQuiz.questions.filter(n => n != selectedQuestion);
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;
    
  }

// *************************************************************************************************
// **                                   Utility Functions                                         **
// *************************************************************************************************

  get numberOfChangedQuizzes() {
    let changedQuizzes = this.quizzes.filter(x =>
                          x.name !== x.originalName 
      ||           x.originalName == "New Untitled Quiz"
      || x.naiveQuestionChecksum !== x.questions.map(y => y.name).join("~")
    );

    return changedQuizzes.length;
  }

  detailsFromLeftAnimationComplete() {
    this.detailsAnimationState = "leftPosition";
  }

  
// *************************************************************************************************
// **                                      Practice Stuff                                         **
// *************************************************************************************************

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;
  //imageWidth = '100px';


  learningPromises() {
    console.log("learningPromises()");

    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      n => {
        console.log(n);

        let y = this.quizSvc.getNumberOfQuizzes(false);
        console.log(y);
    
        y.then(
          n => console.log(n)
        ).catch(
          e => console.log(e)
        );              
      }
      
    ).catch(
      e => console.log(e)
    );


  }

  async learningPromisesWithAsyncAwait() {
    console.log("learningPromisesWithAsyncAwait()");

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
    console.log("learningPromisesWithAsyncAwait()");

    try {
      let x = this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      let y = this.quizSvc.getNumberOfQuizzes(true);
      console.log(y);

      //let results = await Promise.race([x, y]);
      let results = await Promise.all([x, y]);
      console.log(results);
    }

    catch (e) {
      console.log(e);
    }
  }
  increaseImageWidth = () => this.imageWidth *= 1.5;



}
