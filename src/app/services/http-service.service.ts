import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { 

  }

  postMethod(userData:any,to:string): Observable<any> {
    console.log("post init");
    return this.http.post(`http://localhost:8080/${to}`, userData)
  }

  getMethod(): Observable<any> {
    return this.http.get('http://localhost:8080/unidentified')
  }

}
