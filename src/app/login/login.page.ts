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

  constructor(private httpObj: HttpClient, private router: Router) { }
  Login(username:string,pw:string) {
    let formData=new FormData();
      formData.append("unToServer",username);
      formData.append("pwToServer",pw);
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

  signUp(event:any,username:string,pw:string,email:string) {
    let formData=new FormData();
      formData.append("unToServer",username);
      formData.append("pwToServer",pw);
      formData.append("emailToServer",email);
      this.httpObj.post<FormData>('https://chat.tamilcoders.ca/index.php/MainController/signUp',formData).subscribe(data => {
        alert(data['message']);
      });
  }
  
  ngOnInit() {

  }

}
