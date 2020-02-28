import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  conf = 'http://localhost:8080/'

  constructor(private http: HttpClient) { 

  }

  postMethod(userData:any,to:string): Observable<any> {
    console.log("post init");
    return this.http.post(`${this.conf}${to}`, userData)
  }

  getMethod(): Observable<any> {
    return this.http.get(`${this.conf}unidentified`)
  }

  genEncodings(): Observable<any>{
    return this.http.get(`${this.conf}encodings`)
  }

}
