import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddRiskScoreLevelService {

  private baseUrl = 'http://localhost:9050/risk-score-levels/';

  constructor(private _http: HttpClient) {}

  addRiskScoreLevel(data:any):Observable<any>{
    return this._http.post(this.baseUrl,data);
  } 
  getAllRiskScoreLevel():Observable<any>{
    return this._http.get(this.baseUrl);

  }
  deleteRiskScoreLevel(id:any):Observable<any>{
    return this._http.delete(this.baseUrl + id);
  }
  updateRiskScoreLevel(id:any,data:any):Observable<any>{
    return this._http.put(this.baseUrl + id,data);
  } 
  getLevels():Observable<any>{
    return this._http.get(this.baseUrl+'risk-levels');
  }

}
