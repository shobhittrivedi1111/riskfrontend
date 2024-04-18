import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ScoreCapService {

  private baseUrl = 'http://localhost:9050/score-caps/';

  constructor(private _http: HttpClient) {}

  addScoreCap(data:any):Observable<any>{
    return this._http.post(this.baseUrl,data);
  } 
  getAllScoreCap():Observable<any>{
    return this._http.get(this.baseUrl);

  }
  deleteScoreCap(id:any):Observable<any>{
    return this._http.delete(this.baseUrl + id);
  }
  updateScoreCap(id:any,data:any):Observable<any>{
    return this._http.put(this.baseUrl + id,data);
  } 
 
}
