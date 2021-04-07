import { Indicator } from "./Indicator.model";

export class PositionIndicator {
    createdAt
    updatedAt
    positionIndicatorId
    positionId 
    indicator :Indicator ;
    targetValue;
    targetLevel;
    minValue
    maxValue
    isLocal

    constructor(){
        this.positionIndicatorId= null;
        this.positionId = null;
        this.indicator =null ;
        this.targetValue= 0;
        this.minValue= 0;
        this.maxValue= 0;
        this.isLocal=null;
        }
}