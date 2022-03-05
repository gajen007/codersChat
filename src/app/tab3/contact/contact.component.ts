import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() contactName:string = ""
  @Input() userIDofContact:string = ""
  @Input() avatarURL:string = ""
  @Input() avatar:boolean = false;
  @Input() icon:boolean = false;
  constructor() { }
  ngOnInit() {}
  @Output() toClickedContact = new EventEmitter();
  clickFunction(event:any){
    this.toClickedContact.emit({"targetUserID":this.userIDofContact});
  }

}
