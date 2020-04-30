import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import *as Editor from 'cke-editor/build/ckeditor.js';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionToSaveModel } from 'src/app/models/question-to-save-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router
  ) { }

  MIN_ANSWER_LIST_LENGTH = 2;
  MIN_QUESTION_TEXT_LENGTH = 10;
  DEFAULT_TIME_TO_ANSWER = 9;
  DEFAULT_TRUE_ANSWER_ID = -1;
  HTML_REGEX = new RegExp("<[^>]*>", 'g');
  questionForm: FormGroup;
  trueAnswerId = this.DEFAULT_TRUE_ANSWER_ID;
  editor = Editor;


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.questionForm = this.fb.group({
      text: [''],
      time: [this.DEFAULT_TIME_TO_ANSWER],
      answers: this.fb.array([this.createAnswerGroup(), this.createAnswerGroup()])
    })
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  get text() {
    return this.questionForm.get('text').value;
  }

  get timeToAnswer() {
    return this.questionForm.get('time').value;
  }

  createAnswerGroup(): FormGroup {
    return new FormGroup({
      text: new FormControl(''),
      correctAnswer: new FormControl(false)
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswerGroup());
  }

  removeAnswer(answerId: number) {
    if (this.answers.length > this.MIN_ANSWER_LIST_LENGTH) {
      this.answers.removeAt(answerId)
      if (answerId === this.trueAnswerId) {
        this.trueAnswerId = this.DEFAULT_TRUE_ANSWER_ID;
      }
    }
  }
  setTrueAnswer(answerId: number) {
    if (this.trueAnswerId !== this.DEFAULT_TRUE_ANSWER_ID) {
      this.answers.value[this.trueAnswerId].correctAnswer = false
    }
    this.answers.value[answerId].correctAnswer = true;
    this.trueAnswerId = answerId;
  }

  checkQuestion() {
    let pureText = this.text;

    if (this.trueAnswerId !== this.DEFAULT_TRUE_ANSWER_ID
      && this.answers.value.length >= this.MIN_ANSWER_LIST_LENGTH
      && pureText.replace(this.HTML_REGEX, '').length > this.MIN_QUESTION_TEXT_LENGTH
      && this.checkAnswersText()
      && this.checkAnswersDuplicate()) {
      return false;
    } else {
      return true;
    }
  }

  addQuestion() {
    this.questionService.addQuestion(this.createQuestionToSave()).subscribe(data => {
      this.router.navigate(['question/' + data])
    });
  }
  createQuestionToSave() {
    let question = new QuestionToSaveModel();
    question.text = this.text;
    question.timeToAnswer = this.timeToAnswer;
    question.answers = new Array();
    this.answers.value[this.trueAnswerId].correctAnswer = true;

    this.answers.value.forEach(element => {
      question.answers.push(element);
    });

    return question;
  }
  checkAnswersDuplicate() {
    let answersTexts = new Set(this.answers.value.map((answer) => answer.text.replace(this.HTML_REGEX, '')));

    return answersTexts.size === this.answers.value.length;
  }
  checkAnswersText() {
    let answersTexts = this.answers.value.map((x) => x.text.replace(this.HTML_REGEX, ''));

    return answersTexts.filter(text => text === "").length === 0
  }
}
