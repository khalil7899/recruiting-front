import { SkillLevel } from "./SkillLevel.model"

export class SubSkill{
    createdAt
    updatedAt
    subSkillId
    subSkillLabel : string
    subSkillCode: string
    subSkillDetails: string
    skill
    skillLevels:SkillLevel[]

    constructor(){
        this.subSkillId= null
        this.subSkillLabel= ""
        this.subSkillCode=""
        this.subSkillDetails= ""
        this.skill= null
        this.skillLevels=[]
    }
}