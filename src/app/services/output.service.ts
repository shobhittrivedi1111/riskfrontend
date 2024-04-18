import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  private baseUrl = 'http://localhost:9050/output/';

  constructor(private _http: HttpClient) {}

  getAllOutput():Observable<any>{
    return this._http.get(this.baseUrl);

  }
  deleteOutputByCompanyName(companyName: String):Observable<any>{
    return this._http.delete(this.baseUrl + companyName);
  }

}
