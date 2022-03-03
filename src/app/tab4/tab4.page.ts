import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  
})
export class Tab4Page implements OnInit {

  constructor(private httpObj: HttpClient) { }

  ngOnInit() {
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

}
