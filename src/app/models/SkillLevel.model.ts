export class SkillLevel{
    createdAt
    updatedAt
  skillLevelId: number;
  public skillLevelLabel: string;
  public skillLevelCode: string;
  public skillLevelDetails: string;
  public skillLevelScore: number;
  public orderValue: number; 

  constructor(skillLevelLabel: string, skillLevelCode: string,
    skillLevelDetails: string, skillLevelScore: number, orderValue: number ) {
     
    this.skillLevelLabel = skillLevelLabel;
    this.skillLevelCode = skillLevelCode;
    this.skillLevelDetails = skillLevelDetails;
    this.skillLevelScore = skillLevelScore;
    this.orderValue = orderValue;
  }
}
