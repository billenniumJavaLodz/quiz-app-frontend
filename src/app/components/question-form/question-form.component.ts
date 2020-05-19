import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import *as Editor from 'cke-editor/build/ckeditor.js';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { QuestionService } from 'src/app/service/question.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { QuestionToSaveModel } from 'src/app/models/question-to-save-model';
import { QuestionToUpdateModel } from 'src/app/models/question-to-update-model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {


  MIN_ANSWER_LIST_LENGTH = 2;
  MIN_QUESTION_TEXT_LENGTH = 10;
  DEFAULT_TIME_TO_ANSWER = 9;
  DEFAULT_TRUE_ANSWER_ID = -1;
  HTML_REGEX = new RegExp("<[^>]*>", 'g');
  questionForm: FormGroup;
  trueAnswerId = this.DEFAULT_TRUE_ANSWER_ID;
  editor = Editor;


  @Input() formData: any;
  @Input() isCreating: boolean;
  @Output() sumbitQuestionEmmiter = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    if (this.isCreating) {
      this.questionForm = this.fb.group({
        text: [''],
        time: [this.DEFAULT_TIME_TO_ANSWER],
        answers: this.fb.array([this.createAnswerGroup(), this.createAnswerGroup()])
      })
    } else {
      this.questionForm = this.fb.group({
        text: [this.formData.text],
        time: [this.formData.timeToAnswer],
        answers: this.fb.array(this.generateAnswerArray(this.formData.answers))
      });
    }
  }
  generateAnswerArray(answers: any[]) {
    let id = 0;
    let answerForm = [];
    answers.forEach(function (answer, index: number) {

      answerForm.push(new FormGroup({
        text: new FormControl(answer.text),
        correctAnswer: new FormControl(answer.correctAnswer)
      }));

      if (answer.correctAnswer) {
        id = index
      }
    })
    this.trueAnswerId = id;

    return answerForm;
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

  submit() {
    if (this.isCreating) {
      this.sumbitQuestionEmmiter.emit(this.createQuestionToSave());
    } else {
      this.sumbitQuestionEmmiter.emit(this.createQuestionToUpdate());
    }
  }
  createQuestionToSave() {
    let question = new QuestionToSaveModel();
    return this.setFormData(question);
  }

  createQuestionToUpdate() {
    let question = new QuestionToUpdateModel();
    return this.setFormData(question);

  }
  setFormData(question) {
    question.id = this.formData.id;
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
    let answersTexts = this.answers.value.map((answerText) => answerText.text.replace(this.HTML_REGEX, ''));
    return answersTexts.filter(text => text === "").length === 0
  }

  addPhoto() {
    //todo add photo to question
  }
}
