import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from "./../../../services/utils.service";

@Component({
  selector: 'ngx-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss']
})
export class ListGroupsComponent implements OnInit {
  group = null;
  groupsList = [];
  rowgroups = null;
  loading = false;
  titleHeader: any;
  displayAddNewGroup = false;
  displayDeleteGroup=false;
  displayAccessRight = false;

  constructor(private UtilsService: UtilsService,private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.getAllGroups();
    this.initGroup();
  }

  getAllGroups() {
    const context = this;
    this.UtilsService.get(UtilsService.API_GROUP).subscribe(
      (response:any) => {
        context.groupsList = response;
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement de la liste des groupes`
        );
      }
    );
  }

  initGroup() {
    this.group = {
      groupId: null,
      groupLabel: null,
      groupCode: null,
      groupDetails: null,
    };
  }

  editGroup(rowgroup) {

   this.group=rowgroup;
    this.displayAddNewGroup = true;
    this.titleHeader = "Modification d'un group ";

  }

  deleteGroup(rowdata) {
    this.group = rowdata;
    
    this.displayDeleteGroup=true;

  }
  delGroup()
  {
    const context = this;
    this.UtilsService.delete(
      UtilsService.API_GROUP+"/"+this.group.groupId,
    ).subscribe(
      (response) => {
        this.UtilsService.showToast('success',
        'groupe supprimée avec succés',
        `le groupe numéro  ${this.group.groupId} a été supprimée avec succcés`);
        context.displayDeleteGroup = false;
        context.initGroup();
        context.getAllGroups();
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du suppression  du group`
        );
        context.displayDeleteGroup = false;
        context.initGroup();
        context.getAllGroups();
      }
    );
  }
  addNewGroup() {
    this.initGroup();
    this.displayAddNewGroup = true;
    this.titleHeader = "Nouvau group";
  }
  hideAddNewGroup() {
    this.displayAddNewGroup = false;
    this.getAllGroups();
  }

  EditAccessRight(group) {
    this.group=group;
    this.displayAccessRight=true;
  }
  hideAccessRights() {
    this.displayAccessRight = false;
    this.getAllGroups();
  }
  saveNewGroup(group) {
    const context = this;
    this.UtilsService.post(
      UtilsService.API_GROUP,
      this.group
    ).subscribe(
      (response) => {
        context.displayAddNewGroup = false;
        context.initGroup();
        context.getAllGroups();
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du sauvgarde du group`
        );
        context.displayAddNewGroup = false;
        context.initGroup();
      }
    );
  }
}
