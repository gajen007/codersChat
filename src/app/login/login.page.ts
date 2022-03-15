import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  unLogin:string="";
  pwLogin:string="";
  unSignUp:string="";
  pwSignUp:string="";
  emSignUp:string="";
  constructor(private httpObj: HttpClient, private router: Router) { }
  login(event:any) {
    let formData=new FormData();
      formData.append("unToServer",this.unLogin);
      formData.append("pwToServer",this.pwLogin);
      this.httpObj.post<FormData>('https://chat.tamilcoders.ca/index.php/MainController/login',formData).subscribe(data => {
       
      if (data['result']) {
          alert(data['message']); 
         localStorage.setItem("UserID", data['userID']);
         this.router.navigateByUrl('');
           
        } else {
          alert(data['message']); 
        }
});
   
  }
  signUp(event:any) {
    let formData=new FormData();
      formData.append("unToServer",this.unSignUp);
      formData.append("pwToServer",this.pwSignUp);
      formData.append("emailToServer",this.emSignUp);
      this.httpObj.post<FormData>('https://chat.tamilcoders.ca/index.php/MainController/signUp',formData).subscribe(data => {
        alert(data['message']);
      });
  }
  
  ngOnInit() {

  }

}
