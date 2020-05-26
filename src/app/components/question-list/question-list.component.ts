import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { QuestionDetailsModel } from 'src/app/models/question-detiails-model';
import { QuestionService } from 'src/app/service/question.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizSaveModel } from 'src/app/models/quiz-save-model';
import { QuizQuestionModel } from 'src/app/models/quiz-question-model';
import { ParserService } from 'src/app/service/parser.service';
import { MatAccordion } from '@angular/material/expansion';
import { CategoryModel } from 'src/app/models/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  DEFAULT_PAGE_SIZE = 20;
  MIN_BUUTON_GROUPING = 3;
  DEFAULT_PAGE_NUMBER = 0;
  totalElements: number = 0;
  pageSize = this.DEFAULT_PAGE_SIZE;
  pageNumber = this.DEFAULT_PAGE_NUMBER;
  totalPages = Math.ceil(this.totalElements / this.pageSize);
  dataSource: QuestionDetailsModel[];
  categories: CategoryModel[];
  quizQuestions: QuestionDetailsModel[];
  isExpand: boolean = false;
  isButtonsEnabled: boolean = false;
  isQuizAdding: boolean = false;
  isDragDisabled: boolean = true;
  isExpandedAll: boolean = false;

  quizInfoForm = new FormGroup({
    quizCategory: new FormControl(null, Validators.required),
    quizTitle: new FormControl("",
      [Validators.required, Validators.minLength(4), Validators.maxLength(255)])
  });


  @ViewChild('accordion', { static: true }) Accordion: MatAccordion

  constructor(private questionService: QuestionService,
    private router: Router,
    private quizService: QuizService,
    private parserService: ParserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkPath();
    this.initQuizQuestions();
    this.getQuestionPage(this.pageSize, this.pageNumber);

  }

  initQuizQuestions() {
    this.quizQuestions = [];
  }

  getQuestionPage(pageSize: number, pageNumber: number) {

    this.questionService.getQuestionPage(String(pageSize), String(pageNumber)).subscribe(data => {
      this.totalElements = data.totalElements;
      this.pageNumber = data.pageNumber;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      data.questions.sort(function (questionA, questionB) {
        return questionA.id - questionB.id;
      });

      data.questions.forEach(question => {
        if (question.text.includes("pre"))
          question.text = this.parserService.preTagReplacer(question.text);
      })

      this.dataSource = data.questions;
      window.scrollTo(0, 0);
    });
  }

  getCategory() {
    this.quizService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  goToPage($pageNumber: number) {
    this.pageNumber = $pageNumber;
    this.getQuestionPage(this.pageSize, this.pageNumber);
  }

  isInList(question: QuestionDetailsModel) {
    return this.quizQuestions.some(questionQuiz => questionQuiz.id === question.id)
  }

  addToList(question: QuestionDetailsModel) {
    this.isExpand = true;
    this.quizQuestions.push(question);
  }

  removeFromList(question: QuestionDetailsModel) {
    this.isExpand = true;
    this.quizQuestions.splice(this.quizQuestions.findIndex(item => item === question), 1)
  }

  clearQuestionsList() {
    this.quizQuestions = [];
  }

  submitQuestions() {
    if (!this.categories) {
      this.getCategory();
    }
    this.dataSource = this.quizQuestions;
    this.isQuizAdding = true;
    this.isButtonsEnabled = false;
    this.isDragDisabled = false;
  }

  createQuiz() {
    let quiz = new QuizSaveModel();
    quiz.title = this.quizInfoForm.get('quizTitle').value;
    quiz.category = this.quizInfoForm.get('quizCategory').value;
    quiz.questions = this.getQuestions();
    this.quizService.createQuiz(quiz).subscribe(data => {
      this.router.navigateByUrl('/quiz/' + data)
    });
  }

  getQuestions(): QuizQuestionModel[] {
    let questions = [];
    this.quizQuestions.forEach(question => {
      let questionModel = new QuizQuestionModel();
      questionModel.id = question.id;
      questions.push(questionModel)

    });
    return questions;
  }

  back() {
    this.quizInfoForm.reset();
    this.getQuestionPage(this.pageSize, this.pageNumber);
    this.isButtonsEnabled = true;
    this.isQuizAdding = false;
    this.isDragDisabled = true;
  }

  checkPath() {

    if (this.router.url.includes("quiz")) {
      this.isButtonsEnabled = true;
    } else {
      this.isButtonsEnabled = false;
    }
  }

  expand() {
    this.Accordion.openAll();
    this.isExpandedAll = true;
  }

  shrink() {
    this.Accordion.closeAll();
    this.isExpandedAll = false;
  }
}

