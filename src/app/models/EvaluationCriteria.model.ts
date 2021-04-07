export class EvaluationCriteria{
    evaluationCriteriaId;
	
	evaluationCriteriaLabel;
	
	evaluationCriteriaCode;
	ponderation;
    ratingScales;
    constructor(){
        this.evaluationCriteriaId=null;
	
        this.evaluationCriteriaLabel='';
	
        this.evaluationCriteriaCode='';
        this.ponderation=0;
        this.ratingScales=[];

    }
}