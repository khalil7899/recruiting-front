export class positionCategory{
    createdAt
    updatedAt
    positionCategoryId
    positionCategoryLabel: string
    positionCategoryDetails: string
    positionList: []

    constructor(){
        this.positionCategoryId= null
        this.positionCategoryLabel= ""
        this.positionCategoryDetails= null
        this.positionList=[]
    }
}