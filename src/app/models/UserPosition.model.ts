export class UserPosition{
    createdAt: null
    updatedAt: null
    userPositionId: null
    positionId: null
    user: User
    startDate: null
    endDate: null
}

export class User {
    createdAt: null
    updatedAt: null
    userId: null
    userRegistrationNumber: null
    userFirstName: ""
    userLastName: ""
    userPictureUrl: null
    userBirthDate: null
    userBirthCountry: null
    userBirthCity: null
    userNRue: null
    userCity: null
    userPays: null
    userHirringDate: null
    userAddress: null
    userEmail: ""
    userPhoneNumber: ""
    userLogin: ""
    userPassword: ""
    isBlocked: boolean
}