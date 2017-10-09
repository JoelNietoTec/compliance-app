import { Gender } from './genders.model';
import { Param, ParamValue, ParamSubValue } from './params.model';
import { User } from './users.model';
import { ParticipantDocument } from './documents.models';
import { ParticipantRelationship } from './relationships.model';
import { Country } from './country.model';

export interface Participant {
  ID?: number;
  Code?: string;
  FirstName?: string;
  SecondName?: string;
  ThirdName?: string;
  FourthName?: string;
  GenderID?: number;
  Gender?: Gender;
  BirthDate?: Date;
  ParticipantTypeID?: number;
  ParticipantType?: ParticipantType;
  Address?: string;
  Email?: string;
  WebSite?: string;
  LegalRepresentative?: string;
  Phone?: string;
  MobilePhone?: string;
  ParticipantContacts?: Array<ParticipantContact>;
  ParamMatrixID?: number;
  ParticipantParams?: Array<ParticipantParam>;
  Score?: number;
  Rate?: string;
  CreateDate?: Date;
  CreatedBy?: number;
  CreatedByUser?: User;
  PEP?: Boolean;
  Nationalities?: Array<Country>;
}

export interface ParticipantParam {
  ID?: number;
  ParticipantID?: number;
  ParamMatrixID?: number;
  ParamCategoryID?: number;
  ParamID?: number;
  Param?: Param;
  ParamValueID?: number;
  ParamValue?: ParamValue;
  ParamSubValueID?: number;
  ParamSubValue?: ParamSubValue;
  Score?: number;
}

export interface ParticipantType {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}

export interface ParticipantContact {
  ID?: number;
  ParticipantID?: number;
  Name?: number;
  Phone?: number;
  Email?: number;
  MobilePhone?: number;
  Fax?: number;
}
