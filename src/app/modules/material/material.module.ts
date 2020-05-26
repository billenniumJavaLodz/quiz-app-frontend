import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table'
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    DragDropModule,
    MatTabsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    ClipboardModule,
    MatSelectModule
  ],
  exports: [
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    DragDropModule,
    MatTabsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    ClipboardModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
