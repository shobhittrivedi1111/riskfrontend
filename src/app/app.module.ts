import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyFormulaComponent } from './components/company-formula/company-formula.component';
import { AddCompanyFormulaComponent } from './components/add-company-formula/add-company-formula.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { AddRiskDimensionWeightComponent } from './components/add-risk-dimension-weight/add-risk-dimension-weight.component';
import { RiskDimensionWeightComponent } from './components/risk-dimension-weight/risk-dimension-weight.component';
import { AddRiskScoreLevelComponent } from './components/add-risk-score-level/add-risk-score-level.component';
import { RiskScoreLevelComponent } from './components/risk-score-level/risk-score-level.component';
import { AddScoreCapComponent } from './components/add-score-cap/add-score-cap.component';
import { ScoreCapComponent } from './components/score-cap/score-cap.component';
import { CompanyRiskScoreComponent } from './components/company-risk-score/company-risk-score.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TriggerComponent } from './components/trigger/trigger.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddCompanyRiskScoreComponent } from './components/add-company-risk-score/add-company-risk-score.component';
import { OutputComponent } from './components/output/output.component';
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UpdateCompanyRiskScoreComponent } from './components/update-company-risk-score/update-company-risk-score.component';
 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompanyFormulaComponent,
    AddCompanyFormulaComponent,
    RiskDimensionWeightComponent,
    AddRiskDimensionWeightComponent,
    AddRiskScoreLevelComponent,
    RiskScoreLevelComponent,
    CompanyRiskScoreComponent,
    AddCompanyRiskScoreComponent,
    AddScoreCapComponent,
    ScoreCapComponent,
    TriggerComponent,
    OutputComponent,
    HomeComponent,
    UpdateCompanyRiskScoreComponent,
  ],
  imports: [
   MatToolbarModule,
   FormsModule,
   BrowserModule,
   MatButtonModule,
   MatDialogModule,
   MatSelectModule,
   MatProgressBarModule,
   MatSlideToggleModule,
   MatFormFieldModule,
   MatInputModule,
   RouterOutlet,
   MatCardModule,
   MatSidenavModule,
   ReactiveFormsModule,
   MatIconModule,
   HttpClientModule,
   MatSortModule,
   MatListModule,
   MatTableModule,
   BrowserAnimationsModule,
   MatPaginatorModule,
   MatSortModule,
   MatFormFieldModule,
   MatSnackBarModule,
   MatButtonToggleModule,
   RouterModule,
   AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
