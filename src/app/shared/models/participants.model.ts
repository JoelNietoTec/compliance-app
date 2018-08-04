import { Gender } from './genders.model';
import { Param, ParamValue, ParamSubValue } from './params.model';
import { User } from './users.model';
import { Country } from './country.model';

export interface Participant {
  id?: number;
  code?: string;
  firstName?: string;
  secondName?: string;
  thirdName?: string;
  fourthName?: string;
  genderId?: number;
  gender?: Gender;
  birthDate?: Date;
  participantTypeId?: number;
  type?: ParticipantType;
  address?: string;
  email?: string;
  webSite?: string;
  legalRepresentative?: string;
  phone?: string;
  mobilePhone?: string;
  paramMatrixId?: number;
  score?: number;
  rate?: string;
  createDate?: Date;
  createdUserId?: number;
  createdUser?: User;
  pep?: Boolean;
  countryId?: number;
  country?: Country;
  fullName?: string;
  shortName?: string;
  matrixReady?: Boolean;
  age?: number;
  status?: Boolean;
}

export interface ParticipantParam {
  id?: number;
  participantId?: number;
  paramMatrixId?: number;
  paramCategoryId?: number;
  paramId?: number;
  param?: Param;
  paramValueId?: number;
  paramValue?: ParamValue;
  paramSubValueId?: number;
  paramSubValue?: ParamSubValue;
  score?: number;
}

export interface ParticipantType {
  id?: number;
  name?: string;
  englishName?: string;
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

export interface PendingDocument {
  id: number;
  participantId?: number;
  name?: string;
  englishName?: string;
  uploaded?: number;
}

export interface Segment {
  id?: number;
  valueName?: string;
  englishValueName?: string;
  valueId?: number;
  subValueId?: number;
  count?: number;
}
