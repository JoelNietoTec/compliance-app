import { Country } from './country.model';
import { Participant } from './participants.model';

export interface ParticipantDocument {
  id?: number;
  documentTypeId?: number;
  type?: DocumentType;
  participantId?: number;
  participant?: Participant;
  documentCode?: string;
  expeditionDate?: Date;
  expirationDate?: Date;
  countryId?: number;
  country?: Country;
  filePath?: string;
}

export interface DocumentType {
  id?: number;
  name?: string;
  englishName?: string;
  requiredIndividual?: Boolean;
  requiredEntity?: Boolean;
}
