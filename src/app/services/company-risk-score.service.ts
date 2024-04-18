import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CompanyRiskScoreService {
 
  private baseUrl = 'http://localhost:9050/companyRiskScore/';

  constructor(private _http: HttpClient) {}

  addCompanyRiskScore(data:any):Observable<any>{
    return this._http.post(this.baseUrl,data);
  } 
  getAllCompanyRiskScore():Observable<any>{
    return this._http.get(this.baseUrl);

  }
  getCompanyRiskScoreById(companyName: any):Observable<any>{
    return this._http.get(this.baseUrl + companyName);
  }
  deleteCompanyRiskScore(companyName:String):Observable<any>{
    return this._http.delete(this.baseUrl + companyName);
  }
  updateCompanyRiskScore(companyName:String,data:any):Observable<any>{
    return this._http.put(this.baseUrl + companyName,data);
  } 

}
