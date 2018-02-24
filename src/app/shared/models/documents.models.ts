import { Country } from './country.model';

export interface ParticipantDocument {
  ID?: number;
  DocumentTypeID?: number;
  DocumentType?: DocumentType;
  ParticipantID?: number;
  DocumentCode?: string;
  ExpeditionDate?: Date;
  ExpirationDate?: Date;
  CountryID?: number;
  Country?: Country;
  File?: Document;
  FileID?: number;
  FilePath?: string;
}

export interface DocumentType {
  ID?: number;
  Name?: string;
  EnglishName?: string;
  RequiredIndividual?: Boolean;
  RequiredEntity?: Boolean;
}

export interface Document {
  ID?: number;
  File?: any;
}
