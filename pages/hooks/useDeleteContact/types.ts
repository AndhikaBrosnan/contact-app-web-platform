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

type FormContact = {
  id: Scalars["ID"];
  name: Maybe<Scalars["String"]>;
};

export type Phones = {
  number: Scalars["String"];
};

export type MutationInput = {
  first_name: Maybe<Scalars["String"]>;
  last_name: Maybe<Scalars["String"]>;
  created_at: Maybe<Scalars["DateTime"]>;
  phones: Maybe<Phones[]>;
};

export type MutationOutput = {
  insert_contact?: FormContact[];
};
