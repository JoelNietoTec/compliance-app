import { Participant } from './participants.model';

export interface RelationshipType {
  id?: number;
  name?: string;
  englishName?: string;
}

export interface ParticipantRelationship {
  id?: number;
  participantId?: number;
  participant?: Participant;
  relatedParticipantId?: number;
  relatedParticipant?: Participant;
  relationshipTypeId?: number;
  type?: RelationshipType;

}
