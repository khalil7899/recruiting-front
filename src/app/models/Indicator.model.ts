import { indicatorScale } from "./IndicatorScale.model";

export class Indicator {
    createdAt
    updatedAt
    indicatorId
    indicatorName: string
    indicatorSens: string
    indicatorFormula: string
    indicatorEvaluation : string
    indicatorType: string
    indicatorDetail: string
    indicatorScales : indicatorScale[]

    constructor(){
        this.indicatorId = null
        this.indicatorName= ""
        this.indicatorSens= ""
        this.indicatorFormula= null;
        this.indicatorEvaluation = null;
        this.indicatorType=null;
        this.indicatorDetail= null;
        this.indicatorScales = []
    }
}