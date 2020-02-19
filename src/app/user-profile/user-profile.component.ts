import {  Component,  OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {  FormControl,  Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpServiceService } from 'app/services/http-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  url= './assets/new_img/person.png'
  userData: FormGroup

  userId
  userName

  @Input() current_url 
  

  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef, private http: HttpServiceService) {

  }

  ngOnInit() {
    if(this.current_url)
      this.url = this.current_url

      this.userData = this.fb.group({
        userImg: [''],
        userID: [''],
        userName: ['']
      });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let selectedfile = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }

      this.userData.get('userImg').setValue(selectedfile);

      
    }
  }

  validate = new FormControl('', [Validators.required]);
  getErrorMessage() {
    return this.validate.hasError('required') ? 'You must enter a value' :
      '';
  }
  validate1 = new FormControl('', [Validators.required]);
  getErrorMessage1() {
    return this.validate1.hasError('required') ? 'You must enter a value' :
      '';
  }




 
  onSubmit(id, name) {
    let formdata = new FormData()
    // formdata.append('userImg', this.userData.get('userImg').value);
    formdata.append('userId', id);
    formdata.append('userName', name);

    // let user = {
    //   "userImg": this.selectedfile,
    //   "userID" : id,
    //   "userName": name
    // }
    // console.log(user.userImg);

    this.http.postUrl(formdata).subscribe((data) => console.log(data))    
    
  }





}