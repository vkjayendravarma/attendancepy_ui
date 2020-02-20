import {  Component,  OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {  FormControl,  Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpServiceService } from 'app/services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  url:any
  userData: FormGroup

  userId
  userName
  selectedfile
  intruder

  override

  @Input() current_url 
  @Input() intruderID
  

  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef, private http: HttpServiceService, private router: Router) {

  }

  ngOnInit() {
    this.url =  './assets/new_img/person.png'
    this.override = "false"
    if(this.current_url){
      this.url = this.current_url
      this.intruder = this.intruderID
    }
      
    this.userData = this.fb.group({
        userImg: [''],
        userID: [''],
        userName: [''],
        override: ['false']
    });

  }


  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedfile = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }

      this.userData.get('userImg').setValue(this.selectedfile);

      
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

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('#', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }


 
  onSubmit(id, name) {
    let formdata = new FormData()
    formdata.append('userImg', this.userData.get('userImg').value);
    formdata.append('userId', id);
    formdata.append('userName', name);
    formdata.append('force_override', this.override)
    this.http.postMethod(formdata,'newuser').subscribe((res) => {
      console.log(res);      
      if(res.err){
        let force_override = window.confirm("UserID already exists. Do you want to override");
        if(force_override){
          this.override = "true"  
          this.onSubmit(id, name) 
        }                      
      }
      else{
        window.alert(`profile for ${res.userId} is created`)
        this.reload('create-profile')        
      } 
    })    
  }





}