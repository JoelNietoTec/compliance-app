export interface ParamTable {
  id?: number;
  name?: string;
  englishName?: string;
  createDate?: Date;
  modificateDate?: Date;
  tableTypeId?: number;
  type?: TableType;
}

export interface ParamCategory {
  id?: number;
  name?: string;
  englishName?: string;
  weighting?: number;
  paramMatrixId?: number;
  params?: Param[];
}

export interface ParamValue {
  id?: number;
  paramTableId?: number;
  displayValue?: string;
  englishDisplayValue?: string;
  subValues?: ParamSubValue[];
  score?: number;
}

export interface Param {
  id?: number;
  paramCategoryId?: number;
  name?: string;
  englishName?: string;
  description?: string;
  paramTableId?: number;
  table?: ParamTable;
  weighting?: number;
}

export interface TableType {
  id: number;
  name: string;
  englishName: string;
}

export interface ParamSubValue {
  id?: number;
  paramValueId?: number;
  displayValue?: string;
  englishDisplayValue?: string;
  score?: number;
}

export interface ParamMatrix {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  paramCategories?: ParamCategory[];
  matrixTypeId?: number;
  type?: MatrixType;
  createDate?: Date;
  modificateDate?: Date;
}

export interface MatrixType {
  id?: number;
  name?: string;
  englishName?: string;
}
