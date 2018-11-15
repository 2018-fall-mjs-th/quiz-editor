import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  numberQuestions: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  quizzes: quizDisplay[] = [];
  quizLoadingError: boolean = false;

  constructor (private quizSvc: QuizService) {
  }

  ngOnInit() {
    //console.log(this.quizSvc.getQuizzes());
    this.quizSvc.getQuizzes().subscribe(
      // (data) => {
      //   console.log(data);
      //   this.quizzes = data
      // }
      data => this.quizzes = <quizDisplay[]> data
      , error => this.quizLoadingError = true
    );
    console.log("quizzes loaded");
  }

  ngAfterViewInit() {
    console.log("After Viewing");
    // this.setFocusOnQuestion = () => {
    //   // the very first time this function is defined on page load it will throw an undefined error
    //   try {
    //     console.log("Focus called");
    //     this.newQuestionText.nativeElement.focus();
    //   } catch(err) {
    //     console.log("focus called in error");
    //     return;
    //   }
    // };
  }

  // setFocusOnQuestion = undefined;
    
  @ViewChild("newQuestionText") newQuestionText: ElementRef;
  setFocusOnQuestion() {
    // the very first time this function is called it will throw an undefined error
    try {
      console.log("Focus called");
      this.newQuestionText.nativeElement.focus();
    } catch(err) {
      console.log("focus called in error");
      return;
    }
  };


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

  selectedQuiz = undefined;

  selectQuiz(q) 
  {
    this.selectedQuiz = q;
    this.setFocusOnQuestion();
  }

  addNewQuiz() {
    let q = { name: "New Blank Quiz", numberQuestions: 0, questions: []};
    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  newQuestion = undefined;
  addNewQuestion() {
    // console.log(this.newQuestion);
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, {name: this.newQuestion}];
    this.updateQuizLength();
    // console.log(this.selectedQuiz);
    this.newQuestion = "";
    this.setFocusOnQuestion();
  }

  removeQuiz(deletion) {
    this.quizzes = this.quizzes.filter(x => x !== deletion);
    this.selectedQuiz = undefined;
  }

  removeQuestion(deletion) {
    // console.log("Kick me " + ndx);
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== deletion);
    this.updateQuizLength();
  }

  updateQuizLength() {
    this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;
  }

  title = 'quiz-editor';

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;
  //imageWidth = '100px';

  increaseImageWidth = () => this.imageWidth *= 1.5;

  checkKeystroke(event) {
    if (event.key === "Enter") {this.addNewQuestion();}
  }

}
