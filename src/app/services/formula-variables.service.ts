import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FormulaVariablesService {

  private baseUrl = 'http://localhost:9050/variables';

  constructor(private _http: HttpClient) {}

  getAllVariables():Observable<any>{
    return this._http.get(this.baseUrl);
  }
}
