import { Participant } from './participants.model';

export interface RelationshipType {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}

export interface ParticipantRelationship {
  ID?: number;
  ParticipantID?: number;
  Participant?: Participant;
  RelatedParticipantID?: number;
  RelatedParticipant?: Participant;
  RelationshipTypeID?: number;
  Type?: RelationshipType;

}
