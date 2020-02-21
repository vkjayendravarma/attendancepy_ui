import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  url = 'https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg'
  id

  constructor(private getRouteData:ActivatedRoute ) {    
    
  }

  ngOnInit() {
    this.id = this.getRouteData.snapshot.paramMap.get('id')
    console.log(this.id)    
  }

}
