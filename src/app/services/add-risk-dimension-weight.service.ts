import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddRiskDimensionWeightService {

  private baseUrl = 'http://localhost:9050/riskDimensions/';

  constructor(private _http: HttpClient) {}

  addDimensionWeight(data:any):Observable<any>{
    return this._http.post(this.baseUrl,data);
  } 
  getAllDimensionWeight():Observable<any>{
    return this._http.get(this.baseUrl);

  }
  deleteDimensionWeight(dimension:String):Observable<any>{
    return this._http.delete(this.baseUrl + dimension);
  }
  updateDimensionWeight(dimension:String,data:any):Observable<any>{
    return this._http.put(this.baseUrl + dimension,data);
  } 
  addOrUpdateDimensionWeight(data:any):Observable<any>{
    return this._http.put(this.baseUrl+'addUpdate',data);
  }
}
