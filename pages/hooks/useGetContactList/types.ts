type Maybe<T> = T | null;

type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Long: any;
  JSON: any;
};

export type Phones = {
  number: Scalars["String"];
};

export type ContactList = {
  __typename?: "ContactList";
  id: Scalars["ID"];
  first_name: Maybe<Scalars["String"]>;
  last_name: Maybe<Scalars["String"]>;
  created_at: Maybe<Scalars["DateTime"]>;
  phones: Maybe<Phones[]>;
};

export interface QueryInput {
  limit?: number;
  offset?: number;
}

export type QueryOutput = {
  contact?: ContactList[];
};
