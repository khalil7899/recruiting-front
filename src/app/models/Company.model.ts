import { BusinessUnit } from "./BusinessUnit.model";
import { Position } from "./Position.model";

export class Company {
  companyId: number;

  companyLabel: string;

  companyEmail: string;
  companyAddress: string;

  companyPhoneNumber: string;

  companyManagerName: string;

  companyLogoUrl: string;
  companyUniqueIdentifier: string;

  companyCountry: string;
  companyCity: string;

  positionList: Position[];
  businessUnitList: BusinessUnit[];

  constructor() {}
}
