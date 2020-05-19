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

  formData = new QuestionToSaveModel();
  isCreating = true;

  ngOnInit(): void {
  }

  submit(data: QuestionToSaveModel){
    this.formData= data;
    this.questionService.addQuestion(this.formData).subscribe(resposne=>{
      this.router.navigateByUrl('question/'+resposne);
    })
  }
}
