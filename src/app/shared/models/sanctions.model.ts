export interface List {
  ID?: number;
  Name?: String;
}

export interface Sanction {
  ID?: number;
  ListID?: number;
  Date?: Date;
  Term1: String;
  Term2: String;
  Term3: String;
  Term4: String;
  Term5: String;

}
