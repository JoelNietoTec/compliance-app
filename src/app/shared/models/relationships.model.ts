import { Participant } from './participants.model';

export interface RelationshipType {
  id?: number;
  name?: string;
  englishName?: string;
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
