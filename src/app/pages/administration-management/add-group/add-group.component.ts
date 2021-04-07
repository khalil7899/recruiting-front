import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from "./../../../services/utils.service";

@Component({
  selector: 'ngx-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  @Input() group:any = {
    groupId: null,
    groupName: null,
    groupCode: null,
    groupDetails: null,
    userGroupList:[],
  };
  availableUsers:any[];
  selectedUsersGroup:any[];
  draggedUserGroup:any;

  @Output() addNewGroupEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor(private UtilsService: UtilsService,private datePipe:DatePipe,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initDraggedUserGroup();
    this.getAllUsersActive();
    if(this.group.groupId != null && this.group.userGroupList.length>0){
    this.selectedUsersGroup = [...this.group.userGroupList];
    }else{
      this.selectedUsersGroup=[]
    }
  }





  getAllUsersActive()
  {
      let url=""
      if(this.group.groupId != null){
        url=UtilsService.API_USER+"/usersnotingroup/"+this.group.groupId;
      }else{
        url= UtilsService.API_USER
      }
      const context = this;
      this.UtilsService.get(url).subscribe(
        (response:any) => {
          context.availableUsers = response;
        },
        (error) => {
          this.UtilsService.showToast(
            "danger",
            "Erreur interne",
            `Un erreur interne a été produit lors du chargement de la liste des utilisateurs`
          );
        }
      );

  }
  saveNewGroup() {
    this.group.userGroupList=this.selectedUsersGroup;
    this.addNewGroupEvent.emit(this.group);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkCode() {
    this.group.groupCode = this.group.groupName
      .toUpperCase()
      .replaceAll(" ", "_");
  }

  checkGroupValid(): boolean {
    return (
      this.group.groupName === "" ||
      this.group.groupCode === "" ||
      this.group.groupName == null ||
      this.group.groupCode == null
    );
  }


  dragStart(user: any) {
    this.draggedUserGroup.user = user;
    this.draggedUserGroup.startDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.draggedUserGroup.endDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
}

drop(event) {
    if (this.draggedUserGroup) {
        let draggedUserGroupIndex = this.findIndex(this.draggedUserGroup);
        this.selectedUsersGroup = [...this.selectedUsersGroup, this.draggedUserGroup];
        this.availableUsers = this.availableUsers.filter((val,i) => i!=draggedUserGroupIndex);
        this.initDraggedUserGroup();
    }
}

initDraggedUserGroup(){
  this.draggedUserGroup={
    "userGroupId":null,
    "user":null,
    "startDate":null,
    "endDate":null
  };
}

dragEnd() {
  this.initDraggedUserGroup();
}

findIndex(userGroup: any) {
    let index = -1;
    for(let i = 0; i < this.availableUsers.length; i++) {
        if (userGroup.user.userId === this.availableUsers[i].userId) {
            index = i;
            break;
        }
    }
    return index;
}

deleteUserGroup(userGroup){
  let deletedUserGroupIndex=this.findIndexSelected(userGroup);
  if(userGroup.userGroupId == null || userGroup.userGroupId==''){
    this.availableUsers=[...this.availableUsers,userGroup.user]
    this.selectedUsersGroup = this.selectedUsersGroup.filter((val,i) => i!=deletedUserGroupIndex);
  }else{
    this.UtilsService.delete(UtilsService.API_USER_GROUP+'/'+userGroup.userGroupId).subscribe(
      (response) => {
        this.UtilsService.showToast('success',
        'User à été supprimée du group avec succés',
        `${userGroup.user.userLastName +' '+ userGroup.user.userFirstName} a été supprimée du group avec succcés`);
        this.availableUsers=[...this.availableUsers,userGroup.user]
        this.selectedUsersGroup = this.selectedUsersGroup.filter((val,i) => i!=deletedUserGroupIndex);

      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du suppression du user de ce group`
        );

      }

    )

  }
}

findIndexSelected(userGroup: any) {
  let index = -1;
  for(let i = 0; i < this.selectedUsersGroup.length; i++) {
      if (userGroup.user.userId === this.selectedUsersGroup[i].user.userId) {
          index = i;
          break;
      }
  }
  return index;
}

}
