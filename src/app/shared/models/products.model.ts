export interface FinancialProduct {
  id?: number;
  productTypeId?: number;
  type?: ProductType;
  name?: string;
  englishName?: string;
}

export interface ProductType {
  id?: number;
  name?: string;
  englishName?: string;
}

export interface ProfileProduct {
  id?: number;
  participantProfileID?: number;
  financialProductID?: number;
  financialProduct?: FinancialProduct;
  name?: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  monthlyPayment?: number;
  balance?: number;
}
