import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  originalName: string;
  numberQuestions: number;
  questions: questionDisplay[];

}

interface questionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
        originalName: x.name
      }))
      , error => this.wasErrorLoadingQuizzes = true
    );
  }
//test
  selectedQuiz = undefined;

  selectQuiz(quiz){
    console.log(quiz);
    this.selectedQuiz = quiz;
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
      questions:[]};
    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  //appendingQuiz= undefined;

  addNewQuestion(){
  
    let newQuestion = "New Untitled Question";
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, {name:"New Untitled Question"}];
    this.selectQuestion(newQuestion);
    this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;
    console.log("after addNewQuestion \n", this.selectedQuiz.questions[1]);
    console.log(this.numberOfChangedQuizzes);
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
 //numberOfChangedQuizzes = 2;<p>Question&nbsp</p><br />

get numberOfChangedQuizzes(){
  let changedQuizzes = this.quizzes.filter(x => x.name !== x.originalName);
  return changedQuizzes.length;
}

  learningPromises() {
    
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
