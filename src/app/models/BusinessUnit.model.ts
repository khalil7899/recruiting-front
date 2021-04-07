import { Company } from './Company.model';

export class BusinessUnit{
  updatedAt: string;
  createdAt: string;
  businessUnitId; number;
  businessUnitLabel: string;
  businessUnitCode: string;
  parentBusinessUnit: BusinessUnit;
  businessUnitEmail: string;
  businessUnitPhoneNumber: string;
  businessUnitManagerName: string;
  businessUnitDescription: string;
  businessUnitAddress: string;
  businessUnitUniqueIdentifier: string;
 
  businessUnitCity: string;
  businessUnitCountry: string;
  company: Company;

  constructor() {
    //Utile pour initailiser le select
    this.parentBusinessUnit = null;
    this.company = null;
    this.businessUnitId = null;
    this.businessUnitCode = null;
    this.businessUnitLabel = null;
    this.businessUnitDescription = null;
  }
}
