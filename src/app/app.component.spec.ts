import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { QuizService } from './quiz.service';

describe('AppComponent', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let quizService: QuizService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    quizService = new QuizService(<any> httpClientSpy);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ]
    })
    //.overrideComponent(QuizService, quizService)
    .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'quiz-editor'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('quiz-editor');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to quiz-editor!');
  });
});
