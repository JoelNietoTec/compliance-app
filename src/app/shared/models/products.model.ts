export interface FinancialProduct {
  ID?: number;
  ProductTypeID?: number;
  ProductType?: ProductType;
  Name?: string;
  EnglishName?: string;
}

export interface ProductType {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}

export interface ProfileProduct {
  ID?: number;
  ParticipantProfileID?: number;
  FinancialProductID?: number;
  FinancialProduct?: FinancialProduct;
  Name?: string;
  Description?: string;
  StartDate?: Date;
  DueDate?: Date;
  MonnthlyPayment?: number;
  Balance?: number;
}
