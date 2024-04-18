import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  private baseUrl = 'http://localhost:9050/job-execution/trigger';

  constructor(private _http: HttpClient) {}


  getJobExecutionStatus():Observable<any>{
    return this._http.get(this.baseUrl);
  }
}
