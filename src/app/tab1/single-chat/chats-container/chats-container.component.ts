import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ChatTextComponent } from '../chat-text/chat-text.component';
import { ChatAttachmentComponent } from '../chat-attachment/chat-attachment.component';
//import { IonInfiniteScroll } from '@ionic/angular';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-chats-container',
  templateUrl: './chats-container.component.html',
  styleUrls: ['./chats-container.component.scss'],
  entryComponents: [ChatTextComponent, ChatAttachmentComponent]
})
export class ChatsContainerComponent implements OnInit {
  myUserID:string="";
  @Input() opponentID:string="";
  containerHeight: string="0%";
  constructor(private httpObj:HttpClient, private cfr: ComponentFactoryResolver) { }
  @ViewChild('allChats',{static: true,read: ViewContainerRef}) singleChat: ViewContainerRef;

  ngOnInit(){
    this.loadMessages();
  }
  loadMessages() {
    var innerThis = this;
    //setInterval(()=>{
      innerThis.myUserID = localStorage.getItem("UserID");
        innerThis.singleChat.clear();
        innerThis.httpObj.get('https://rukshanmobileapp.artsuit.ca/index.php/Chats/getChatsBetween?userIDToServer='+innerThis.myUserID+'&opponentIDToServer='+innerThis.opponentID).pipe(map((res:any)=>{return res;})).subscribe(data => {
          if (data != null) {
            data.forEach((element:any) => {
              innerThis.containerHeight=(parseInt(innerThis.containerHeight)+2).toString();
              if (element.resourceURL!=null) {
                const factory = innerThis.cfr.resolveComponentFactory(ChatAttachmentComponent);
                const componentRef = innerThis.singleChat.createComponent(factory);
                componentRef.instance.chatMessage=element.chatMessage;
                componentRef.instance.attachmentURL="https://rukshanmobileapp.artsuit.ca/"+element.resourceURL;
                if(element.senderID==innerThis.myUserID){
                  componentRef.instance.alignment="right";
                  componentRef.instance.buttonColor="success";
                }
                else{ componentRef.instance.alignment="left"; componentRef.instance.buttonColor="primary"; }
              }
              else {
                const factory = innerThis.cfr.resolveComponentFactory(ChatTextComponent);
                const componentRef = innerThis.singleChat.createComponent(factory);
                componentRef.instance.chatMessage=element.chatMessage;
                if(element.senderID==innerThis.myUserID){
                  componentRef.instance.alignment="right";
                  componentRef.instance.buttonColor="success";
                }
                else{ componentRef.instance.alignment="left"; componentRef.instance.buttonColor="primary"; }
              }
              
            });
           
          } else {
          }
        });
   //},5000);

  }
}
