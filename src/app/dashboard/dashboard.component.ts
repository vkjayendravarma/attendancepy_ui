import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpServiceService } from 'app/services/http-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  date
  session

  records = []

  loading = false

  constructor(private http: HttpServiceService) { }
  ngOnInit() {
  }

  getAddendance(date, session){
    date = date.replace('/','-')
    date = date.replace('/','-')
    let data = {
      "date": date,
      "session": session
    } 
    
    this.records = []
    
    console.log(data);  
    this.loading = true

    this.http.postMethod(data,'getattendance').subscribe((res)=>{
      this.loading = false
      if(res.err){
        window.alert(res.err)
      } 
      else{
        this.records = res.res
      }   
    })  
  }
  

}
