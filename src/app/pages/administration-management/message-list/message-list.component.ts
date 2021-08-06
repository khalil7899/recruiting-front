import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
   messageReceivers:any;
   messageSenders:any;
   showNewMessage:boolean=false;
   message:any;
   users:any=[];
   isRh:boolean=false;
  constructor(private utilsService: UtilsService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initMessage();
    this.getAllMessagesReceiver();
    this.getAllMessagesSender();
    this.getAllUsers();
    if (localStorage.getItem("userRole") === "CANDIDATE" ||localStorage.getItem("userRole") === "TRAINEE") {
      this.isRh = false;
    }
    else {
      this.isRh = true;
    }

  }
  getAllMessagesReceiver() {
   this.utilsService.get(UtilsService.API_MESSAGERIE+"/receiver").subscribe((response)=>{
    this.messageReceivers=response;
    console.log(this.messageReceivers);

   },(error)=>{
    this.utilsService.showToast(
      "danger",
      "Erreur interne",
      `Un erreur interne a été produit lors du chargement de la liste des messages recues`
    );
   })
  }
  getAllMessagesSender() {
    this.utilsService.get(UtilsService.API_MESSAGERIE+"/sender").subscribe((response)=>{
      this.messageSenders=response;
      console.log(this.messageSenders);
     },(error)=>{
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du chargement de la liste des messages envoyées`
      );
     })
  }
  getAllUsers()
  {
    this.utilsService.get(UtilsService.API_USER+"/getAllUsers").subscribe((response)=>{
      this.users=response;
      console.log(this.users);
     },(error)=>{
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du chargement de la liste des utilisateurs`
      );
     })
  }
  initMessage()
  {
    this.message={
      messageLabel:"",
      messageContenu:"",
      messageUserReceiver:null
    }
  }

  compareUser(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.userId === b.userId;
  }

  checkValidMessage(){
    if(this.isRh==false)
    {
      return  this.message.messageLabel === '' || this.message.messageContenu == ''
    }
    else{
      return this.message.messageUserReceiver == null || this.message.messageUserReceiver === '' 
      || this.message.messageLabel === '' || this.message.messageContenu == ''
    }

  }

  sendMessage(){
    this.utilsService.post(UtilsService.API_MESSAGERIE,this.message).subscribe((response)=>{
      this.utilsService.showToast('success',
      'Message envoyé avec succés',
      `Le message intitulé  ${this.message.messageLabel} a été envoyé avec succcés`);
      this.initMessage();
      this.getAllMessagesReceiver();
      this.getAllMessagesSender();
      this.getAllUsers();
      this.showNewMessage=false;
     },(error)=>{
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du l\'envoie d'un message`
      );
     })
  }

}