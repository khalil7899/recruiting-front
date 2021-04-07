import { Component, OnInit , Input,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
@Component({
  selector: 'ngx-access-right-management',
  templateUrl: './access-right-management.component.html',
  styleUrls: ['./access-right-management.component.scss']
})
export class AccessRightManagementComponent implements OnInit {

  @Input() group;
  @Output() cancelEvent = new EventEmitter();
  listGroupAccessRightDto=[];
     accessRights: any[];

    rowGroupMetadata: any;

    constructor(private utilsService: UtilsService,private route:Router) { }

    ngOnInit() {
      this.getAccessRights();
    
    }

    getAccessRights(){
        this.utilsService.get(UtilsService.API_ACCESS_RIGHT+'/getAllAccessRightByGroup/'+this.group.groupId).subscribe(
          (response:any) => {
            this.accessRights=response;
           // this.updateRowGroupMetaData();
          },
          (error) => {
            this.utilsService.showToast(
              "danger",
              "Erreur interne",
              `Un erreur interne a été produit lors du chargement des access right`
            );
          }
        )
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.accessRights) {
            for (let i = 0; i < this.accessRights.length; i++) {
                let rowData = this.accessRights[i];
                let accessRightParent = rowData.accessRightIdParent;
                
                if (i == 0) {
                    this.rowGroupMetadata[accessRightParent] = { index: 0, size: 1 };
                }
                else {
                    let previousRowData = this.accessRights[i - 1];
                    let previousRowGroup = previousRowData.accessRightIdParent;
                    if (accessRightParent === previousRowGroup)
                        this.rowGroupMetadata[accessRightParent].size++;
                    else
                        this.rowGroupMetadata[accessRightParent] = { index: i, size: 1 };
                }
            }
        }
    }


    cancel() {
      this.cancelEvent.emit();
     // console.log("cancel et retour to group");
    // this.route.navigateByUrl("/zen-people-referential/administration/list-groups");
    }

    deleteGroupAccessRight(groupAccessRightDtos){
         groupAccessRightDtos.hasAccessRight=false;
       
    }

    addGroupAccessRight(groupAccessRightDtos){
      groupAccessRightDtos.hasAccessRight=true;
   
    }
    valider()
    { this.listGroupAccessRightDto=[];
     
      for(let access of this.accessRights)
      {
        for(let accessChild of access.accessRightListChild)
        {
          for(let groupAccessRight of accessChild.groupAccessRightDtos)
          {
            
            this.listGroupAccessRightDto.push(groupAccessRight);
          }
        }
      }

         this.utilsService.post(UtilsService.API_GROUP_ACCESS_RIGHT+"/updateAccessRight",this.listGroupAccessRightDto).subscribe(
        (response:any) => {
          this.utilsService.showToast(
            "success",
            "Droits d'accès modifiés avec succés",
            `Les droits d'accès du groupe ${this.group.groupName} ont été modifiés avec succés`
          );
       //this.getAccessRights();
       this.cancel();
     },
     (error) => {
       this.utilsService.showToast(
         "danger",
         "Erreur interne",
         `Un erreur interne a été produit lors de modification des access right d'un groupe`
       );
     }
     );

    }

}
