import {  Component,  OnInit, Input} from '@angular/core';
import {  FormControl,  Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  url = "./assets/new_img/person.png"

  @Input() current_url 

  constructor() {}

  ngOnInit() {
    if(this.current_url)
      this.url = this.current_url
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  validate = new FormControl('', [Validators.required]);


  getErrorMessage() {
    return this.validate.hasError('required') ? 'You must enter a value' :
      '';
  }

}