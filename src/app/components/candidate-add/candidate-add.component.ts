import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CandidateModel } from 'src/app/models/candidate-model';
import { CandidateSaveModel } from 'src/app/models/candidate-save-model';
import { QuizModel } from 'src/app/models/quiz-model';
import { CandidateService } from 'src/app/service/candidate.service';
import { QuizService } from 'src/app/service/quiz.service';
import { SessionStorageService } from 'src/app/service/session.storage.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.scss']
})
export class CandidateAddComponent implements OnInit, OnDestroy {

  DEFAULT_PAGE_SIZE = 10;
  DEFAULT_PAGE_NUMBER = 0;
  totalElements: number = 0;
  pageSize = this.DEFAULT_PAGE_SIZE;
  pageNumber = this.DEFAULT_PAGE_NUMBER;
  totalPages = Math.ceil(this.totalElements / this.pageSize);
  dataSource: QuizModel[];
  quiz: QuizModel;
  candidateUUID: string;
  url = "https://" + window.location.host + "/candidate/";

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  addedCandidates: CandidateModel[] = [];
  displayedColumns: string[] = ['email', 'quiz', 'address'];
  addedCandidatesDataSource = new MatTableDataSource();



  constructor(private quizService: QuizService,
    private cadidateService: CandidateService,
    private sessionStorageService: SessionStorageService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private router: Router) {

  }


  ngOnInit(): void {
    this.getSavedCandidates();
    this.getQuizzes(this.pageSize, this.pageNumber);
  }


  ngOnDestroy(): void {
    let quizUrlRegex = new RegExp('quiz\/([0-9]+)[^\/]*$');
    let componentUrl = 'candidate/add';
    if (!this.router.url.match(quizUrlRegex) && !this.router.url.match(componentUrl)) {
      this.clearAddedCandidates();
    }
  }


  getQuizzes(pageSize: number, pageNumber: number) {
    this.quizService.getQuizzes(pageSize, pageNumber).subscribe(data => {

      this.totalElements = data.totalElements;
      this.pageNumber = data.pageNumber;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      this.dataSource = data.quizzes;
    });
    window.scrollTo(0, 0);
  }

  goToPage($pageNumber: number) {
    this.pageNumber = $pageNumber;
    this.getQuizzes(this.pageSize, this.pageNumber);
  }

  setQuiz($quiz: QuizModel) {
    this.quiz = $quiz;
  }

  isDisabled() {
    return this.quiz === undefined || this.email.invalid;
  }

  saveCandidate() {
    let candidate = new CandidateSaveModel();
    candidate.email = this.email.value;
    candidate.quizId = this.quiz.id;
    this.cadidateService.saveUser(candidate).subscribe(data => {
      let candidateSaved = new CandidateModel();
      candidateSaved.email = this.email.value;
      candidateSaved.id = data;
      candidateSaved.quizTitle = this.quiz.title;
      this.addedCandidates.push(candidateSaved);
      this.addedCandidatesDataSource = new MatTableDataSource(this.addedCandidates);
      this.resetForm();
      this.setSavedCandidates();
    });
  }

  getSavedCandidates() {
    let arrayOfCandidateId = JSON.parse(this.sessionStorageService.getSavedCandidates());
    if (arrayOfCandidateId !== null) {
      arrayOfCandidateId.forEach(id => {
        this.cadidateService.getUser(id).subscribe(data => {
          this.addedCandidates.push(data);
        });

      });

      this.addedCandidatesDataSource = new MatTableDataSource(this.addedCandidates);
    }
  }

  setSavedCandidates() {
    let arrayOCandidatesId = [];
    this.addedCandidates.forEach(canididate => {
      arrayOCandidatesId.push(canididate.id);
    });
    this.sessionStorageService.setSavedCandidates(arrayOCandidatesId);
  }

  resetForm() {
    this.email.reset();
    this.quiz = undefined;
  }

  copyToClipboard(id: string) {
    this.clipboard.copy(this.url + id);
    this.snackBar.open("Pomyślnie skopiowano", "Zamknij", {
      duration: 500
    });
  }

  clearAddedCandidates(){
    this.sessionStorageService.setSavedCandidates([]);
    this.addedCandidates = [];
    this.addedCandidatesDataSource = new MatTableDataSource();
  }
}
