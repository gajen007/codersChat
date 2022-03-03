import { Component,OnInit,ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { SendChatFormComponent } from './send-chat-form/send-chat-form.component';
import { ChatsContainerComponent } from './chats-container/chats-container.component';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.page.html',
  styleUrls: ['./single-chat.page.scss'],
  entryComponents: [MenuBarComponent]
})
export class SingleChatPage implements OnInit {
  private forRoute:any;
  opponentName:string=""
  opponentID:string=""
  constructor(private httpObj:HttpClient, private route: ActivatedRoute, private cfr: ComponentFactoryResolver) { }
  @ViewChild('forChatContainer',{static: true,read: ViewContainerRef}) chatContainer: ViewContainerRef;
  @ViewChild('forSendChatForm',{static: true,read: ViewContainerRef}) sendChatForm: ViewContainerRef;
  ngOnInit() {
    var innerThis = this;
    innerThis.forRoute = innerThis.route.params.subscribe(params => { innerThis.opponentID = params['userID']; });
    innerThis.httpObj.get('https://chat.tamilcoders.ca/index.php/MainController/getUserData?myUserID='+innerThis.opponentID+'&opponentIDToServer='+innerThis.opponentID).pipe(map((res:any)=>{return res;})).subscribe(data => {
      innerThis.opponentName=data.username;
    });
    
    const factory1 = innerThis.cfr.resolveComponentFactory(ChatsContainerComponent);
    const componentRef1 = innerThis.chatContainer.createComponent(factory1);
    componentRef1.instance.opponentID=innerThis.opponentID;
    
    const factory2 = innerThis.cfr.resolveComponentFactory(SendChatFormComponent);
    const componentRef2 = innerThis.sendChatForm.createComponent(factory2);
    componentRef2.instance.opponentID=innerThis.opponentID;
    componentRef2.instance.toChatContainer.subscribe(function(){
      componentRef1.instance.ngOnInit();
    });

  }
}



