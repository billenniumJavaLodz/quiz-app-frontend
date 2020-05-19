import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionToUpdateModel } from 'src/app/models/question-to-update-model';
import { QuestionModel } from 'src/app/models/question-model';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  formData: QuestionModel;
  isCreating = false;
  constructor(private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion() {
    this.questionService.getQuestion(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
      if (data.id === null) {
        this.router.navigateByUrl("/")
      }
      this.formData = data;
    })
  }
  submit(data: QuestionToUpdateModel) {
    this.questionService.updateQuestion(data).subscribe(data => {
      this.router.navigateByUrl('question/' + this.formData.id);
    })
  }

}
