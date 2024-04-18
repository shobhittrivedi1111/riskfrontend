import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TriggerComponent } from './components/trigger/trigger.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScoreCapComponent } from './components/score-cap/score-cap.component';
import { RiskDimensionWeightComponent } from './components/risk-dimension-weight/risk-dimension-weight.component';
import { RiskScoreLevelComponent } from './components/risk-score-level/risk-score-level.component';
import { CompanyFormulaComponent } from './components/company-formula/company-formula.component';
import { CompanyRiskScoreComponent } from './components/company-risk-score/company-risk-score.component';
import { OutputComponent } from './components/output/output.component';
import { HomeComponent } from './components/home/home.component';
import { AddCompanyRiskScoreComponent } from './components/add-company-risk-score/add-company-risk-score.component';
import { UpdateCompanyRiskScoreComponent } from './components/update-company-risk-score/update-company-risk-score.component';

const routes: Routes = [
 
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'trigger',
    component: TriggerComponent,
  },
  {
    path: 'risk-dimension-weight',
    component: RiskDimensionWeightComponent
  },
  {
    path: 'score-cap',
    component: ScoreCapComponent,
  },
  {
    path: 'company-formula',
    component: CompanyFormulaComponent,
  },
  {
    path: 'risk-score-level',
    component: RiskScoreLevelComponent,
  },
  {
    path: 'company-risk-score',
    component: CompanyRiskScoreComponent,
  },
  {
    path: 'output',
    component: OutputComponent,
  },
  {
    path: 'add-company-risk-score',
    component: AddCompanyRiskScoreComponent,

  },
  {
    path: 'update-company-risk-score/:companyName',
    component: UpdateCompanyRiskScoreComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
