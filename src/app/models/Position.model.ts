import { Attribution } from './attribution.model';
import { BusinessUnit } from "./BusinessUnit.model";
import { Category } from "./Category.model";
import { Company } from './Company.model';
import { EvaluationCriteria } from "./EvaluationCriteria.model";
import { Mission } from "./Mission.model";
import { PositionEvaluationCriteria } from './PositionEvaluationCriteria.model';
import { PositionIndicator } from "./PositionIndicator.model";
import { PositionSubSkill } from "./PositionSubSkill.model";
import { UserPosition } from "./UserPosition.model";

export class Position {

    createdAt
    updatedAt
    positionId: number;
    positionCode: string;
    positionLabel: string

    hierarchicalManagerPosition: any;
  functionalManagerPosition: any;

    //functionalRoles: any[];
    positionWeight: number;
    businessUnit
    company
    //attributions:Attribution[];
    //evaluationCriteriaList : PositionEvaluationCriteria[] = []
    //positionCategory : Category
    //missions : Mission[]
    job;
    startDate:string;
    endDate:string;

    //userPosition :UserPosition;
    //positionSubSkillList: PositionSubSkill[];
    //positionIndicatorList: PositionIndicator[];

    constructor(){
        this.positionId= null;
        this.positionCode =null;
        this.positionLabel= '';
        this.hierarchicalManagerPosition= null;
        this.functionalManagerPosition=null;
        //this.functionalRoles= [];
        this.positionWeight= null;
        this.businessUnit= null;
        this.company= null;
        //this.attributions= null;
        //this.evaluationCriteriaList= [];
        //this.positionCategory= null;
        //this.missions= [];
        //this.attributions=[];
        this.job=null;
        this.startDate="";
        this.endDate="";
    }




}
