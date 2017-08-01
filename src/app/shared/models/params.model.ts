export interface ParamTable {
  ID?: number;
  Name?: string;
  EnglishName?: string;
  CreateDate?: Date;
  ModificateDate?: Date;
  TableTypeID?: number;
  TableType?: TableType;
  ParamValues?: ParamValue[];
}

export interface ParamCategory {
  ID?: number;
  Name?: string;
  EnglishName?: string;
  Weighting?: number;
  ParamMatrixID?: number;
  Params?: Param[];
}

export interface ParamValue {
  ID?: number;
  ParamTableID?: number;
  DisplayValue?: string;
  EnglishDisplayValue?: string;
  ParamSubValues?: ParamSubValue[];
  Score?: number;
}

export interface Param {
  ID?: number;
  ParamCategoryID?: number;
  Name?: string;
  EnglishName?: string;
  Description?: string;
  ParamTableID?: number;
  ParamTable?: ParamTable;
  Weighting?: number;
}

export interface TableType {
  ID: number;
  Name: string;
  EnglishName: string;
}

export interface ParamSubValue {
  ID?: number;
  ParamValueID?: number;
  DisplayValue?: string;
  EnglishDisplayValue?: string;
  Score?: number;
}

export interface ParamMatrix {
  ID?: number;
  Name?: string;
  Code?: string;
  Description?: string;
  ParamCategories?: ParamCategory[];
  MatrixTypeID?: number;
  MatrixType?: MatrixType;
  CreateDate?: Date;
  ModificateDate?: Date;
}

export interface MatrixType {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}
