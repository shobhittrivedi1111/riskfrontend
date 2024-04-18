import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCompanyFormulaService {

  private baseUrl = 'http://localhost:9050/risk-calc-logics/';

  constructor(private _http: HttpClient) {}

  addFormula(data:any):Observable<any>{
    return this._http.post(this.baseUrl,data);
  } 
  getAllFormulas():Observable<any>{
    return this._http.get(this.baseUrl);

  }
  deleteFormula(id:any):Observable<any>{
    return this._http.delete(this.baseUrl + id);
  }
  updateFormula(id:any,data:any):Observable<any>{
    return this._http.put(this.baseUrl + id,data);
  } 
}
