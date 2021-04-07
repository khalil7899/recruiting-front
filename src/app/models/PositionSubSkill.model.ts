import { SkillLevel } from "./SkillLevel.model"
import { SubSkill } from "./SubSkill.model"

export class PositionSubSkill{
    createdAt
    updatedAt
    positionSubSkillId
    positionId
    subSkill : SubSkill
    local 
    requiredLevel : SkillLevel

    constructor(){
        this.positionSubSkillId= null
        this.positionId= null
        this.subSkill = null
        this.local =null
        this.requiredLevel = null
    }

}