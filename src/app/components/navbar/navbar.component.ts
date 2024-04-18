import { Component, ViewChild } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 

  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['']);
  }

  goToTrigger() {
    this.router.navigate(['/trigger']);
  }
  goToCompany(){
    this.router.navigate(['/company-risk-score']);
  }
  goToDimensionWeight(){
    this.router.navigate(['/risk-dimension-weight']);
  }
  goToFormula(){
    this.router.navigate(['/company-formula']);
  }
  goToRiskScoreLevel(){
    this.router.navigate(['/risk-score-level']);
  }
  goToOutput(){
    this.router.navigate(['/output']);
  }
  goToScoreCap(){
    this.router.navigate(['/score-cap']);
  }
}
