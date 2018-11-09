import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  numberQuestions: number;
  questions: any [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  quizzes: quizDisplay[] = [];

  wasErrorLoadingQuizzes: boolean = false;

  constructor(private quizSvc: QuizService) {
    // this.quizzes = this.quizSvc.getQuizzes();
  }

  ngOnInit() {
    // because getQuizzes returns an Observable, we have to subscribe to it
    this.quizSvc.getQuizzes().subscribe(
    
      // a shorter way
      data => this.quizzes = <quizDisplay[]> data
      , error => this.wasErrorLoadingQuizzes = true

      //   data => {
      //    console.log(data);
      //     this.quizzes = data;
      //   }
    );
  }

  selectedQuiz = undefined;
  selectQuiz(q) {
    // console.log(q);
    this.selectedQuiz = q;
  }

  addNewQuiz() {
    let q = { name: "Untitled Quiz", numberQuestions: 0, questions: [] };
    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  addNewQuestion() {
    if (this.selectedQuiz.questions) {
      this.selectedQuiz.questions = [...this.selectedQuiz.questions, { name: "New Question" } ];
    } else {
    this.selectedQuiz.questions = [ { name: "New Question" } ];
    }
  }

  removeQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
    // console.log(this.selectedQuiz.questions);
    // console.log(question);
    // console.log(this.selectedQuiz.questions.length);
  }

  learningPromises() {
    console.log("learningPromises()");

    let x = this.quizSvc.getNumberofQuizzes(true);
    console.log(x);

    x.then(
      n => console.log(n)
    ).catch( e => console.log(e)
  );

    let y = this.quizSvc.getNumberofQuizzes(false);
    console.log(y);

    y.then(
      n => console.log(n)
    ).catch(
      e => console.log(e)
    );

  }

  async learningPromisesWithAsyncAwait() {
    console.log("I'm in learningPromissesWithAstncAwait");
    try {
      let x = await this.quizSvc.getNumberofQuizzes(true);
      console.log(x)

      let y = await this.quizSvc.getNumberofQuizzes(false);
      console.log(y)
    } catch (e) {
      console.log(e);
    }
  }


  title = 'quiz-editor';

  dumb = 'foo';

  titleColorDanger = this.dumb === 'foo' ? false : true;
  titleBackgroundColorDanger = true;

  headingTwoBgColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.5;

}
