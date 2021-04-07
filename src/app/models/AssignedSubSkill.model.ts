import { SubSkill } from "./SubSkill.model";

export class AssignedSubSkill {
    skillsGroupLabel: string;
	skillsGroupId: number;
     availableSkills: SubSkill[];
  assignedSkills: SubSkill[];
  buisnessUnitId: number;
  buisnessUnitLabel: string;
  
    constructor() {
      this.skillsGroupId = null;
      this.skillsGroupLabel = null
      this.availableSkills = [];
      this.assignedSkills = [];
    }
  }
