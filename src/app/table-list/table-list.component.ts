import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'app/services/http-service.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  data = []
  loading = true
  status = ''
  imgURL: SafeResourceUrl
  constructor(private http: HttpServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    status = ''
    this.http.getMethod().subscribe((res) => {
      this.loading = false
      if(res.err){
        window.alert(res.err)
        this.status = 'No new unidentified people'
      }
      else{
        this.data = res.res 
        console.log(this.data);
              
      }
    })    
  }

  getSantizeUrl(url : string) { 
    return this.sanitizer.bypassSecurityTrustUrl(url); 
}

}
